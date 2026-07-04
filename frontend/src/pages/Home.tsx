import { useEffect, useState } from "react";
import { api } from "../api";
import type { Dashboard, ResultRow, Election } from "../types";
import { Users, Vote as VoteIcon, Calendar, TrendingUp, Plus } from "lucide-react";

export default function Home() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashboardData, electionsData] = await Promise.all([
          api.getDashboard() as Promise<Dashboard>,
          api.getElections() as Promise<Election[]>
        ]);
        setDashboard(dashboardData);
        setElections(electionsData);
        
        if (electionsData.length > 0) {
          const resultsData = await api.getResults(electionsData[0].id) as ResultRow[];
          setResults(resultsData);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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
          <strong>{dashboard?.voters || 0}</strong>
        </div>
        <div className="stat-card">
          <VoteIcon className="stat-icon" />
          <span>Votes Cast</span>
          <strong>{dashboard?.votes || 0}</strong>
        </div>
        <div className="stat-card">
          <Calendar className="stat-icon" />
          <span>Active Elections</span>
          <strong>{dashboard?.elections || 0}</strong>
        </div>
        <div className="stat-card">
          <TrendingUp className="stat-icon" />
          <span>Candidates</span>
          <strong>{dashboard?.candidates || 0}</strong>
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
            {elections.slice(0, 5).map((election) => (
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
            {results.map((row) => {
              const totalVotes = results.reduce((sum, r) => sum + r.voteCount, 0);
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
