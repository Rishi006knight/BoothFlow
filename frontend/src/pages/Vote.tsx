import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import type { Candidate, Election, PollingStation, Voter } from "../types";
import { CheckCircle } from "lucide-react";
import UserLogin from "../components/UserLogin";
import { useApi, ErrorBlock } from "../useApi";

export default function Vote() {
  const electionsApi = useApi<Election[]>();
  const pollingApi = useApi<PollingStation[]>();
  const votersApi = useApi<Voter[]>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [voterId, setVoterId] = useState<number>(1);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedElection, setSelectedElection] = useState<number>(0);
  const [selectedCandidate, setSelectedCandidate] = useState<number>(0);
  const [selectedPollingStation, setSelectedPollingStation] = useState<number>(0);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  const loadData = useCallback(async (currentVoterId: number) => {
    const [e, , v] = await Promise.all([
      electionsApi.fetch(() => api.getElections() as Promise<Election[]>),
      pollingApi.fetch(() => api.getPollingStations() as Promise<PollingStation[]>),
      votersApi.fetch(() => api.getVoters() as Promise<Voter[]>)
    ]);

    if (e.length > 0) {
      const activeVoter = v.find((x) => x.id === currentVoterId);
      const matchedElection = activeVoter?.constituency
        ? e.find((el) => el.constituency?.id === activeVoter.constituency.id) || e[0]
        : e[0];

      setSelectedElection(matchedElection.id);
      setSelectedPollingStation(0);

      try {
        const c = (await api.getCandidates(matchedElection.id)) as Candidate[];
        setCandidates(c);
        if (c.length > 0) {
          setSelectedCandidate(c[0].id);
        } else {
          setSelectedCandidate(0);
        }
      } catch (err) {
        console.error("Failed to load candidates for election", err);
      }
    }
  }, []);

  useEffect(() => {
    void loadData(voterId);
  }, [loadData]);

  const handleLogin = (id: number) => {
    setVoterId(id);
    setIsAuthenticated(true);
    setMessage("");
    void loadData(id);
  };

  const handleElectionChange = async (electionId: number) => {
    setSelectedElection(electionId);
    setSelectedCandidate(0);
    setSelectedPollingStation(0);
    setMessage("");
    try {
      const c = (await api.getCandidates(electionId)) as Candidate[];
      setCandidates(c);
      if (c.length > 0) {
        setSelectedCandidate(c[0].id);
      }
    } catch (error) {
      console.error("Failed to load candidates", error);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate || !selectedPollingStation || !selectedElection) {
      setMessage("Please select all options before voting");
      return;
    }
    setVoting(true);
    setMessage("");
    try {
      await api.castVote({
        voterId,
        candidateId: selectedCandidate,
        electionId: selectedElection,
        pollingStationId: selectedPollingStation
      });
      setHasVoted(true);
      setMessage("Your vote has been cast successfully!");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setVoting(false);
    }
  };

  if (!isAuthenticated) {
    return <UserLogin onLogin={handleLogin} />;
  }

  if (electionsApi.loading) return <div className="loading">Connecting to server...</div>;
  if (electionsApi.error) return <ErrorBlock message={electionsApi.error} onRetry={() => void loadData(voterId)} />;

  const elections = electionsApi.data || [];
  const pollingStations = pollingApi.data || [];
  const voters = votersApi.data || [];

  const currentVoter = voters.find((v) => v.id === voterId);
  const currentElection = elections.find((e) => e.id === selectedElection);

  const isConstituencyMatch =
    !currentVoter?.constituency ||
    !currentElection?.constituency ||
    currentVoter.constituency.id === currentElection.constituency.id;

  const filteredPollingStations = pollingStations.filter((station) => {
    if (!currentElection?.constituency?.id) return true;
    return station.constituency?.id === currentElection.constituency.id;
  });

  if (hasVoted) {
    const votedElection = elections.find((e) => e.id === selectedElection);
    return (
      <div className="page-content">
        <div className="vote-success-container">
          <div className="vote-success-card">
            <CheckCircle className="success-icon" />
            <h2>Vote Cast Successfully!</h2>
            <p>Thank you for participating in the democratic process.</p>
            {votedElection && (
              <div style={{
                margin: "1rem 0",
                padding: "0.75rem",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "8px",
                color: "#166534",
                fontSize: "0.9rem"
              }}>
                <strong>Recorded in Election:</strong> {votedElection.name}
                {votedElection.constituency?.name && (
                  <div><strong>Constituency:</strong> {votedElection.constituency.name} ({votedElection.constituency.state})</div>
                )}
              </div>
            )}
            <p>Your vote has been recorded and immediately added to the live tally.</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.25rem", flexWrap: "wrap" }}>
              <Link
                to={`/results?electionId=${selectedElection}`}
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  textDecoration: "none"
                }}
              >
                View Live Results
              </Link>
              <button
                onClick={() => { setHasVoted(false); setIsAuthenticated(false); }}
                style={{
                  background: "#f8fafc",
                  color: "#334155",
                  border: "1px solid #cbd5e1",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Switch / New Voter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Cast Your Vote</h1>
        <p className="page-subtitle">Select your candidate and polling station to vote</p>
      </div>

      <div className="vote-container">
        {/* Voter Profile Banner */}
        <div className="vote-section" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="vote-section-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <User className="section-icon" />
              <span>Voter Profile</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "1px solid #cbd5e1",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <RefreshCw size={12} /> Switch Voter
            </button>
          </div>
          {currentVoter ? (
            <div style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "#334155" }}>
              <div><strong>Name:</strong> {currentVoter.name} ({currentVoter.voterCode})</div>
              <div>
                <strong>Registered Constituency:</strong>{" "}
                <span style={{ color: "#1d4ed8", fontWeight: 600 }}>
                  {currentVoter.constituency?.name} ({currentVoter.constituency?.state})
                </span>
              </div>
            </div>
          ) : (
            <div className="voter-info"><span>Voter ID: {voterId}</span></div>
          )}
        </div>

        {/* Election Selector */}
        <div className="vote-section">
          <h3 className="vote-section-title"><VoteIcon className="section-icon" />Select Election</h3>
          <select
            value={selectedElection}
            onChange={(e) => handleElectionChange(Number(e.target.value))}
            className="vote-select"
          >
            {elections.map((election) => {
              const isVoterConstituency =
                currentVoter?.constituency && election.constituency?.id === currentVoter.constituency.id;
              const label = election.constituency?.name
                ? `${election.name} — ${election.constituency.name}${isVoterConstituency ? " ⭐ (Your Constituency)" : ""}`
                : election.name;
              return (
                <option key={election.id} value={election.id}>
                  {label}
                </option>
              );
            })}
          </select>

          {/* Constituency Mismatch Warning */}
          {!isConstituencyMatch && currentVoter && currentElection && (
            <div style={{
              marginTop: "0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              background: "#fff7ed",
              border: "1px solid #fdba74",
              color: "#9a3412",
              fontSize: "0.85rem",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-start"
            }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong>Constituency Mismatch:</strong> You are registered in{" "}
                <strong>{currentVoter.constituency?.name}</strong>, but have selected an election for{" "}
                <strong>{currentElection.constituency?.name}</strong>. Cross-constituency voting is not allowed.
              </div>
            </div>
          )}
        </div>

        {/* Candidate Selector */}
        <div className="vote-section">
          <h3 className="vote-section-title"><VoteIcon className="section-icon" />Select Candidate</h3>
          {candidates.length > 0 ? (
            <div className="candidates-grid">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`candidate-option ${selectedCandidate === candidate.id ? "selected" : ""}`}
                  onClick={() => setSelectedCandidate(candidate.id)}
                >
                  <div className="candidate-avatar">{candidate.name.split(" ").map((n) => n[0]).join("")}</div>
                  <div className="candidate-details">
                    <h4>{candidate.name}</h4>
                    <p>{candidate.party.name}</p>
                    <span className="party-symbol">{candidate.party.symbol}</span>
                  </div>
                  {selectedCandidate === candidate.id && <CheckCircle className="check-icon" />}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#64748b", fontStyle: "italic", fontSize: "0.9rem" }}>
              No candidates currently registered for this election contest.
            </p>
          )}
        </div>

        {/* Polling Station Selector */}
        <div className="vote-section">
          <h3 className="vote-section-title"><MapPin className="section-icon" />Select Polling Station</h3>
          {currentElection?.constituency && (
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "-0.5rem", marginBottom: "0.75rem" }}>
              Showing polling stations for <strong>{currentElection.constituency.name}</strong>
            </p>
          )}
          <select
            value={selectedPollingStation}
            onChange={(e) => setSelectedPollingStation(Number(e.target.value))}
            className="vote-select"
          >
            <option value={0}>Select a polling station</option>
            {filteredPollingStations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name} — {station.location}
              </option>
            ))}
          </select>
          {filteredPollingStations.length === 0 && (
            <p style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "0.5rem" }}>
              No polling stations registered for this constituency.
            </p>
          )}
        </div>

        {message && (
          <div className={`vote-message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <button
          onClick={handleVote}
          disabled={voting || !selectedCandidate || !selectedPollingStation || !isConstituencyMatch}
          className="vote-submit-button"
        >
          {voting ? "Casting Vote..." : !isConstituencyMatch ? "Cannot Vote in Different Constituency" : "Cast Vote"}
        </button>
      </div>
    </div>
  );
}