import { useState } from "react";
import { User } from "lucide-react";

interface UserLoginProps {
  onLogin: (voterId: number) => void;
}

export default function UserLogin({ onLogin }: UserLoginProps) {
  const [voterCode, setVoterCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in production, this would verify against backend
    if (voterCode.trim().length < 3) {
      setError("Please enter a valid voter code");
      return;
    }
    // For demo, use the voter code as ID (in production, verify with backend)
    const voterId = parseInt(voterCode.replace(/\D/g, "")) || 1;
    onLogin(voterId);
  };

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <div className="user-login-header">
          <h2>Voter Login</h2>
          <p>Enter your voter code to cast your vote</p>
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
              onChange={(e) => setVoterCode(e.target.value)}
              placeholder="Enter your voter code"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Continue to Vote</button>
        </form>
        <div className="login-hint">
          <p>Enter your registered voter code to proceed</p>
        </div>
      </div>
    </div>
  );
}
