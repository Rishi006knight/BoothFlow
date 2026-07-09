import { useEffect } from "react";
import { api } from "../api";
import type { Dashboard, ResultRow, Election } from "../types";
import { Users, Vote as VoteIcon, Calendar, TrendingUp, Plus } from "lucide-react";
import { useApi, ErrorBlock } from "../useApi";

export default function Home() {
  const dashboard = useApi<Dashboard>();
  const elections = useApi<Election[]>();
  const results = useApi<ResultRow[]>();

  const loadAll = async () => {
    const [, e] = await Promise.all([
      dashboard.fetch(() => api.getDashboard() as Promise<Dashboard>),
      elections.fetch(() => api.getElections() as Promise<Election[]>)
    ]);
    if (e.length > 0) {
      await results.fetch(() => api.getResults(e[0].id) as Promise<ResultRow[]>);
    }
  };

  useEffect(() => { void loadAll(); }, []);

  if (dashboard.loading) {
    return <div className="loading">Connecting to server...</div>;
  }

  if (dashboard.error) {
    return <ErrorBlock message={dashboard.error} onRetry={() => void loadAll()} />;
  }

  const d = dashboard.data!;
  const el = elections.data || [];
  const r = results.data || [];

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
          <span>Votes Cast</span>
          <strong>{d.votes || 0}</strong>
        </div>
        <div className="stat-card">
          <Calendar className="stat-icon" />
          <span>Active Elections</span>
          <strong>{d.elections || 0}</strong>
        </div>
        <div className="stat-card">
          <TrendingUp className="stat-icon" />
          <span>Candidates</span>
          <strong>{d.candidates || 0}</strong>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Recent Elections</h2>
          <button className="icon-button">
            <Plus size={20} />
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Election Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Constituency</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {el.slice(0, 5).map((election) => (
              <tr key={election.id}>
                <td>{election.name}</td>
                <td>{election.type}</td>
                <td>{new Date(election.electionDate).toLocaleDateString()}</td>
                <td>{election.constituency.name}</td>
                <td>
                  <span className="status-badge active">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Live Results</h2>
        </div>
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
              const totalVotes = r.reduce((sum, x) => sum + x.voteCount, 0);
              const percentage = totalVotes > 0 ? ((row.voteCount / totalVotes) * 100).toFixed(1) : "0";
              return (
                <tr key={row.candidateId}>
                  <td>{row.candidateName}</td>
                  <td>{row.partyName}</td>
                  <td>{row.voteCount}</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}