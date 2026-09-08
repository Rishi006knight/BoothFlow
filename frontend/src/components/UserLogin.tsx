import { useEffect, useState } from "react";
import { User, CheckCircle2 } from "lucide-react";
import { api } from "../api";
import type { Voter } from "../types";

interface UserLoginProps {
  onLogin: (voterId: number) => void;
}

export default function UserLogin({ onLogin }: UserLoginProps) {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [voterCode, setVoterCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getVoters()
      .then((data) => setVoters(data as Voter[]))
      .catch((err) => console.error("Failed to load voters for login", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voterCode.trim().toUpperCase();
    if (!code) {
      setError("Please enter a valid voter code");
      return;
    }

    // Match against real voters loaded from backend
    const matched = voters.find((v) => v.voterCode.toUpperCase() === code);
    if (matched) {
      setError("");
      onLogin(matched.id);
    } else {
      // Fallback if voters haven't loaded or code is numeric ID
      const numericId = parseInt(code.replace(/\D/g, ""), 10);
      if (numericId > 0) {
        onLogin(numericId);
      } else {
        setError(`Voter code "${code}" not found. Please select from the demo voters below.`);
      }
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <div className="user-login-header">
          <h2>Voter Login</h2>
          <p>Enter your voter ID code or select your profile below</p>
        </div>
        <form onSubmit={handleSubmit} className="user-login-form">
          <div className="form-group">
            <label>
              <User className="input-icon" />
              <span>Voter Code</span>
            </label>
            <input
              type="text"
              value={voterCode}
              onChange={(e) => {
                setVoterCode(e.target.value);
                setError("");
              }}
              placeholder="e.g. VOT-TN-001 or VOT-TN-004"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Continue to Vote</button>
        </form>

        <div className="login-hint" style={{ marginTop: "1.25rem" }}>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            Select Registered Voter:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "220px", overflowY: "auto" }}>
            {voters.length > 0 ? (
              voters.slice(0, 5).map((v) => (
                <button
                  key={v.id}
                  type="button"
                  style={{
                    cursor: "pointer",
                    border: "1px solid #cbd5e1",
                    background: "#f8fafc",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  onClick={() => {
                    setVoterCode(v.voterCode);
                    onLogin(v.id);
                  }}
                >
                  <div>
                    <strong>{v.voterCode}</strong> — {v.name}
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Constituency: {v.constituency?.name} ({v.constituency?.state})
                    </div>
                  </div>
                  <CheckCircle2 size={16} color="#3b82f6" />
                </button>
              ))
            ) : (
              <>
                <button
                  type="button"
                  style={{ cursor: "pointer", border: "1px solid #cbd5e1", background: "#f8fafc", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", textAlign: "left" }}
                  onClick={() => { setVoterCode("VOT-TN-001"); onLogin(1); }}
                >
                  <strong>VOT-TN-001</strong> — Rajesh Kumar (Chennai Central)
                </button>
                <button
                  type="button"
                  style={{ cursor: "pointer", border: "1px solid #cbd5e1", background: "#f8fafc", padding: "8px 12px", borderRadius: "6px", fontSize: "0.85rem", textAlign: "left" }}
                  onClick={() => { setVoterCode("VOT-TN-004"); onLogin(4); }}
                >
                  <strong>VOT-TN-004</strong> — Anitha Selvam (Chennai South)
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
