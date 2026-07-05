import { useEffect, useState } from "react";
import { api } from "../api";
import type { Election, Constituency } from "../types";
import { Calendar, MapPin, Vote as VoteIcon, Filter } from "lucide-react";
import { useApi, ErrorBlock } from "../useApi";

export default function Elections() {
  const electionsApi = useApi<Election[]>();
  const constituenciesApi = useApi<Constituency[]>();
  const [selectedConstituency, setSelectedConstituency] = useState<string>("all");

  const load = async () => {
    await Promise.all([
      electionsApi.fetch(() => api.getElections() as Promise<Election[]>),
      constituenciesApi.fetch(() => api.getConstituencies() as Promise<Constituency[]>)
    ]);
  };

  useEffect(() => { void load(); }, []);

  if (electionsApi.loading) return <div className="loading">Connecting to server...</div>;
  if (electionsApi.error) return <ErrorBlock message={electionsApi.error} onRetry={() => void load()} />;

  const elections = electionsApi.data || [];
  const constituencies = constituenciesApi.data || [];

  const filteredElections = elections.filter((e) =>
    selectedConstituency === "all" || e.constituency.id === Number(selectedConstituency)
  );

  const electionsByType = filteredElections.reduce((acc, e) => {
    if (!acc[e.type]) acc[e.type] = [];
    acc[e.type].push(e);
    return acc;
  }, {} as Record<string, Election[]>);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Elections</h1>
        <p className="page-subtitle">View and manage election details</p>
      </div>

      <div className="filters-bar">
        <div className="filter-box">
          <Filter className="filter-icon" />
          <select value={selectedConstituency} onChange={(e) => setSelectedConstituency(e.target.value)}>
            <option value="all">All Constituencies</option>
            {constituencies.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><Calendar className="stat-icon" /><span>Total Elections</span><strong>{filteredElections.length}</strong></div>
        <div className="stat-card"><VoteIcon className="stat-icon" /><span>Election Types</span><strong>{Object.keys(electionsByType).length}</strong></div>
        <div className="stat-card"><MapPin className="stat-icon" /><span>Constituencies</span><strong>{new Set(filteredElections.map((e) => e.constituency.id)).size}</strong></div>
      </div>

      {Object.entries(electionsByType).map(([type, typeElections]) => (
        <section key={type} className="panel">
          <div className="panel-header">
            <h2>{type} Elections</h2>
            <span className="status-badge active">{typeElections.length} active</span>
          </div>
          <table>
            <thead>
              <tr><th>Code</th><th>Name</th><th>Date</th><th>Constituency</th><th>Status</th></tr>
            </thead>
            <tbody>
              {typeElections.map((election) => (
                <tr key={election.id}>
                  <td>{election.electionCode}</td>
                  <td>{election.name}</td>
                  <td>{new Date(election.electionDate).toLocaleDateString()}</td>
                  <td><span className="voter-constituency"><MapPin size={14} />{election.constituency.name}</span></td>
                  <td><span className="status-badge active">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      {filteredElections.length === 0 && (
        <div className="empty-state"><Calendar size={48} /><p>No elections found matching your criteria.</p></div>
      )}
    </div>
  );
}