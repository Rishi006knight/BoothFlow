import { useEffect, useState } from "react";
import { api } from "../api";
import type { Candidate, Election } from "../types";
import { Search, Filter } from "lucide-react";
import { useApi, ErrorBlock } from "../useApi";

export default function Candidates() {
  const candidatesApi = useApi<Candidate[]>();
  const electionsApi = useApi<Election[]>();
  const [selectedElection, setSelectedElection] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const load = async () => {
    await Promise.all([
      candidatesApi.fetch(() => api.getCandidates() as Promise<Candidate[]>),
      electionsApi.fetch(() => api.getElections() as Promise<Election[]>)
    ]);
  };

  useEffect(() => { void load(); }, []);

  if (candidatesApi.loading) return <div className="loading">Connecting to server...</div>;
  if (candidatesApi.error) return <ErrorBlock message={candidatesApi.error} onRetry={() => void load()} />;

  const candidates = candidatesApi.data || [];
  const elections = electionsApi.data || [];

  const filteredCandidates = candidates.filter((c) => {
    const matchesElection = selectedElection === "all" || c.election.id === Number(selectedElection);
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.party.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesElection && matchesSearch;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Candidates</h1>
        <p className="page-subtitle">View candidate profiles and party affiliations</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input type="text" placeholder="Search candidates..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="filter-box">
          <Filter className="filter-icon" />
          <select value={selectedElection} onChange={(e) => setSelectedElection(e.target.value)}>
            <option value="all">All Elections</option>
            {elections.map((e) => (<option key={e.id} value={e.id}>{e.name}</option>))}
          </select>
        </div>
      </div>

      <div className="candidates-grid">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <div className="candidate-header">
              <div className="candidate-avatar">{candidate.name.split(" ").map((n) => n[0]).join("")}</div>
              <div className="candidate-party-badge">{candidate.party.symbol}</div>
            </div>
            <h3 className="candidate-name">{candidate.name}</h3>
            <p className="candidate-party">{candidate.party.name}</p>
            <div className="candidate-details">
              <div className="detail-item"><span className="detail-label">Age</span><span className="detail-value">{candidate.age}</span></div>
              <div className="detail-item"><span className="detail-label">Qualification</span><span className="detail-value">{candidate.qualification}</span></div>
              <div className="detail-item"><span className="detail-label">Election</span><span className="detail-value">{candidate.election.name}</span></div>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="empty-state"><p>No candidates found matching your criteria.</p></div>
      )}
    </div>
  );
}