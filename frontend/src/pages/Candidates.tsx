import { useEffect, useState } from "react";
import { api } from "../api";
import type { Candidate, Election } from "../types";
import { Search, Filter } from "lucide-react";

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [candidatesData, electionsData] = await Promise.all([
          api.getCandidates() as Promise<Candidate[]>,
          api.getElections() as Promise<Election[]>
        ]);
        setCandidates(candidatesData);
        setElections(electionsData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesElection = selectedElection === "all" || candidate.election.id === Number(selectedElection);
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.party.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesElection && matchesSearch;
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Candidates</h1>
        <p className="page-subtitle">View candidate profiles and party affiliations</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter className="filter-icon" />
          <select value={selectedElection} onChange={(e) => setSelectedElection(e.target.value)}>
            <option value="all">All Elections</option>
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="candidates-grid">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <div className="candidate-header">
              <div className="candidate-avatar">
                {candidate.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="candidate-party-badge">{candidate.party.symbol}</div>
            </div>
            <h3 className="candidate-name">{candidate.name}</h3>
            <p className="candidate-party">{candidate.party.name}</p>
            <div className="candidate-details">
              <div className="detail-item">
                <span className="detail-label">Age</span>
                <span className="detail-value">{candidate.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Qualification</span>
                <span className="detail-value">{candidate.qualification}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Election</span>
                <span className="detail-value">{candidate.election.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="empty-state">
          <p>No candidates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
