import { useEffect, useState } from "react";
import { api } from "../api";
import type { Election, ResultRow } from "../types";
import { BarChart3, Trophy, Filter } from "lucide-react";

export default function Results() {
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<number>(0);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const electionsData = await api.getElections() as Election[];
        setElections(electionsData);
        if (electionsData.length > 0) {
          setSelectedElection(electionsData[0].id);
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

  const handleElectionChange = async (electionId: number) => {
    setSelectedElection(electionId);
    setLoadingResults(true);
    try {
      const resultsData = await api.getResults(electionId) as ResultRow[];
      setResults(resultsData);
    } catch (error) {
      console.error("Failed to load results", error);
    } finally {
      setLoadingResults(false);
    }
  };

  const totalVotes = results.reduce((sum, r) => sum + r.voteCount, 0);
  const winner = results.length > 0 ? results[0] : null;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Election Results</h1>
        <p className="page-subtitle">View live election results and vote counts</p>
      </div>

      <div className="filters-bar">
        <div className="filter-box">
          <Filter className="filter-icon" />
          <select value={selectedElection} onChange={(e) => handleElectionChange(Number(e.target.value))}>
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name} - {election.constituency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {winner && (
        <div className="stats-grid">
          <div className="stat-card">
            <Trophy className="stat-icon" />
            <span>Leading Candidate</span>
            <strong>{winner.candidateName}</strong>
          </div>
          <div className="stat-card">
            <BarChart3 className="stat-icon" />
            <span>Leading Party</span>
            <strong>{winner.partyName}</strong>
          </div>
          <div className="stat-card">
            <BarChart3 className="stat-icon" />
            <span>Total Votes</span>
            <strong>{totalVotes}</strong>
          </div>
        </div>
      )}

      <section className="panel">
        <div className="panel-header">
          <h2>Vote Tally</h2>
        </div>
        {loadingResults ? (
          <div className="loading">Loading results...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Candidate</th>
                <th>Party</th>
                <th>Votes</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => {
                const percentage = totalVotes > 0 ? ((row.voteCount / totalVotes) * 100).toFixed(1) : "0";
                return (
                  <tr key={row.candidateId}>
                    <td>
                      {index === 0 ? <Trophy size={18} className="stat-icon" /> : index + 1}
                    </td>
                    <td>{row.candidateName}</td>
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

      {results.length === 0 && !loading && (
        <div className="empty-state">
          <BarChart3 size={48} />
          <p>No results available for the selected election.</p>
        </div>
      )}
    </div>
  );
}
