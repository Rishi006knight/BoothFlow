import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import type { Dashboard, ResultRow, Election } from "../types";
import { Users, Vote as VoteIcon, Calendar, TrendingUp, Trophy, ArrowRight, RefreshCw } from "lucide-react";
import { useApi, ErrorBlock } from "../useApi";

export default function Home() {
  const dashboard = useApi<Dashboard>();
  const elections = useApi<Election[]>();
  const results = useApi<ResultRow[]>();
  const [selectedElectionId, setSelectedElectionId] = useState<number>(0);
  const [loadingResults, setLoadingResults] = useState(false);

  const loadAll = async () => {
    const [, e] = await Promise.all([
      dashboard.fetch(() => api.getDashboard() as Promise<Dashboard>),
      elections.fetch(() => api.getElections() as Promise<Election[]>)
    ]);
    if (e.length > 0) {
      const initialId = e[0].id;
      setSelectedElectionId(initialId);
      await results.fetch(() => api.getResults(initialId) as Promise<ResultRow[]>);
    }
  };

  const handleElectionChange = async (electionId: number) => {
    setSelectedElectionId(electionId);
    setLoadingResults(true);
    try {
      await results.fetch(() => api.getResults(electionId) as Promise<ResultRow[]>);
    } finally {
      setLoadingResults(false);
    }
  };

  useEffect(() => {
    void loadAll();
  }, []);

  if (dashboard.loading) {
    return <div className="loading">Connecting to server...</div>;
  }

  if (dashboard.error) {
    return <ErrorBlock message={dashboard.error} onRetry={() => void loadAll()} />;
  }

  const d = dashboard.data!;
  const el = elections.data || [];
  const r = results.data || [];
  const currentElection = el.find((e) => e.id === selectedElectionId);
  const totalVotesInSelected = r.reduce((sum, x) => sum + x.voteCount, 0);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Election Management System</h1>
        <p className="page-subtitle">Dashboard Overview</p>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <Users className="stat-icon" />
          <span>Total Voters</span>
          <strong>{d.voters || 0}</strong>
        </div>
        <div className="stat-card">
          <VoteIcon className="stat-icon" />
          <span>Total Votes Cast</span>
          <strong>{d.votes || 0}</strong>
        </div>
        <div className="stat-card">
          <Calendar className="stat-icon" />
          <span>Active Elections</span>
          <strong>{d.elections || 0}</strong>
        </div>
        <div className="stat-card">
          <TrendingUp className="stat-icon" />
          <span>Registered Candidates</span>
          <strong>{d.candidates || 0}</strong>
        </div>
      </section>

      {d.latestResults && d.latestResults.length > 0 && (
        <section className="panel" style={{ marginTop: "1.5rem" }}>
          <div className="panel-header">
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Trophy size={20} color="#eab308" />
              Constituency Leaders
            </h2>
            <Link to="/results" style={{ fontSize: "0.85rem", color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
              All Results →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", padding: "1rem 0" }}>
            {d.latestResults.map((lr) => (
              <div
                key={lr.electionId}
                style={{
                  padding: "1rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onClick={() => void handleElectionChange(lr.electionId)}
              >
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569" }}>{lr.electionName}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>{lr.leadingCandidate}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                  <span style={{ background: "#e2e8f0", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                    {lr.partyName}
                  </span>
                  <strong style={{ color: "#16a34a" }}>{lr.voteCount} {lr.voteCount === 1 ? "vote" : "votes"}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="panel" style={{ marginTop: "1.5rem" }}>
        <div className="panel-header">
          <h2>Recent Elections</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Election Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Constituency</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {el.slice(0, 5).map((election) => (
              <tr key={election.id}>
                <td>{election.name}</td>
                <td>{election.type}</td>
                <td>{new Date(election.electionDate).toLocaleDateString()}</td>
                <td>{election.constituency?.name ?? "General"}</td>
                <td>
                  <span className="status-badge active">Active</span>
                </td>
                <td>
                  <Link
                    to={`/results?electionId=${election.id}`}
                    style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500, fontSize: "0.85rem" }}
                  >
                    View Results
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel" style={{ marginTop: "1.5rem" }}>
        <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2>Live Results: {currentElection?.constituency?.name ?? currentElection?.name}</h2>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
              {totalVotesInSelected} votes recorded
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            <select
              value={selectedElectionId}
              onChange={(e) => void handleElectionChange(Number(e.target.value))}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "0.9rem",
                background: "#ffffff"
              }}
            >
              {el.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.constituency?.name ? `${e.name} — ${e.constituency.name}` : e.name}
                </option>
              ))}
            </select>
            <Link
              to={`/results?electionId=${selectedElectionId}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600
              }}
            >
              Full Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {loadingResults ? (
          <div className="loading">Loading election results...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Party</th>
                <th>Votes</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {r.map((row) => {
                const percentage = totalVotesInSelected > 0 ? ((row.voteCount / totalVotesInSelected) * 100).toFixed(1) : "0";
                return (
                  <tr key={row.candidateId}>
                    <td><strong>{row.candidateName}</strong></td>
                    <td>{row.partyName}</td>
                    <td><strong>{row.voteCount}</strong></td>
                    <td>
                      <div className="vote-percentage-bar">
                        <div className="vote-percentage-fill" style={{ width: `${percentage}%` }}></div>
                        <span>{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}