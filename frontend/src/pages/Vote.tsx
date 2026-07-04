import { useEffect, useState } from "react";
import { api } from "../api";
import type { Candidate, Election, PollingStation } from "../types";
import { CheckCircle, Vote as VoteIcon, User, MapPin } from "lucide-react";
import UserLogin from "../components/UserLogin";

export default function Vote() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [voterId, setVoterId] = useState<number>(1);
  const [elections, setElections] = useState<Election[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [pollingStations, setPollingStations] = useState<PollingStation[]>([]);
  const [selectedElection, setSelectedElection] = useState<number>(0);
  const [selectedCandidate, setSelectedCandidate] = useState<number>(0);
  const [selectedPollingStation, setSelectedPollingStation] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [electionsData, pollingData] = await Promise.all([
          api.getElections() as Promise<Election[]>,
          api.getPollingStations() as Promise<PollingStation[]>
        ]);
        setElections(electionsData);
        setPollingStations(pollingData);
        if (electionsData.length > 0) {
          setSelectedElection(electionsData[0].id);
          const candidatesData = await api.getCandidates(electionsData[0].id) as Candidate[];
          setCandidates(candidatesData);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  const handleElectionChange = async (electionId: number) => {
    setSelectedElection(electionId);
    try {
      const candidatesData = await api.getCandidates(electionId) as Candidate[];
      setCandidates(candidatesData);
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
    return <UserLogin onLogin={(id) => { setVoterId(id); setIsAuthenticated(true); }} />;
  }

  if (loading) {
    return <div className="loading">Loading election data...</div>;
  }

  if (hasVoted) {
    return (
      <div className="page-content">
        <div className="vote-success-container">
          <div className="vote-success-card">
            <CheckCircle className="success-icon" />
            <h2>Vote Cast Successfully!</h2>
            <p>Thank you for participating in the democratic process.</p>
            <p>Your vote has been recorded and will be counted.</p>
            <button onClick={() => { setHasVoted(false); setIsAuthenticated(false); }}>
              Return to Login
            </button>
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
        <div className="vote-section">
          <h3 className="vote-section-title">
            <User className="section-icon" />
            Voter Information
          </h3>
          <div className="voter-info">
            <span>Voter ID: {voterId}</span>
          </div>
        </div>

        <div className="vote-section">
          <h3 className="vote-section-title">
            <VoteIcon className="section-icon" />
            Select Election
          </h3>
          <select
            value={selectedElection}
            onChange={(e) => handleElectionChange(Number(e.target.value))}
            className="vote-select"
          >
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name} - {new Date(election.electionDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div className="vote-section">
          <h3 className="vote-section-title">
            <VoteIcon className="section-icon" />
            Select Candidate
          </h3>
          <div className="candidates-grid">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`candidate-option ${selectedCandidate === candidate.id ? "selected" : ""}`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="candidate-avatar">
                  {candidate.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="candidate-details">
                  <h4>{candidate.name}</h4>
                  <p>{candidate.party.name}</p>
                  <span className="party-symbol">{candidate.party.symbol}</span>
                </div>
                {selectedCandidate === candidate.id && (
                  <CheckCircle className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="vote-section">
          <h3 className="vote-section-title">
            <MapPin className="section-icon" />
            Select Polling Station
          </h3>
          <select
            value={selectedPollingStation}
            onChange={(e) => setSelectedPollingStation(Number(e.target.value))}
            className="vote-select"
          >
            <option value="">Select a polling station</option>
            {pollingStations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name} - {station.location}
              </option>
            ))}
          </select>
        </div>

        {message && (
          <div className={`vote-message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <button
          onClick={handleVote}
          disabled={voting || !selectedCandidate || !selectedPollingStation}
          className="vote-submit-button"
        >
          {voting ? "Casting Vote..." : "Cast Vote"}
        </button>
      </div>
    </div>
  );
}
