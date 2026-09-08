import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import type { Election, ResultRow } from "../types";
import { BarChart3, Trophy, Filter, RefreshCw, CheckCircle2 } from "lucide-react";
import { useApi, ErrorBlock } from "../useApi";

export default function Results() {
  const electionsApi = useApi<Election[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedElection, setSelectedElection] = useState<number>(0);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const load = async () => {
    const e = await electionsApi.fetch(() => api.getElections() as Promise<Election[]>);
    if (e.length > 0) {
      const paramId = searchParams.get("electionId");
      const matched = paramId ? e.find((el) => el.id === Number(paramId)) : null;
      const targetId = matched ? matched.id : e[0].id;
      setSelectedElection(targetId);
      if (!paramId || Number(paramId) !== targetId) {
        setSearchParams({ electionId: String(targetId) }, { replace: true });
      }
      setLoadingResults(true);
      try {
        const r = (await api.getResults(targetId)) as ResultRow[];
        setResults(r);
      } finally {
        setLoadingResults(false);
      }
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleElectionChange = async (electionId: number) => {
    setSelectedElection(electionId);
    setSearchParams({ electionId: String(electionId) });
    setLoadingResults(true);
    try {
      const r = (await api.getResults(electionId)) as ResultRow[];
      setResults(r);
    } catch (error) {
      console.error("Failed to load results", error);
    } finally {
      setLoadingResults(false);
    }
  };

  const handleRefresh = async () => {
    if (!selectedElection) return;
    setLoadingResults(true);
    try {
      const r = (await api.getResults(selectedElection)) as ResultRow[];
      setResults(r);
    } catch (error) {
      console.error("Failed to refresh results", error);
    } finally {
      setLoadingResults(false);
    }
  };

  const totalVotes = results.reduce((sum, r) => sum + r.voteCount, 0);
  const isTie = results.length > 1 && results[0].voteCount > 0 && results[0].voteCount === results[1].voteCount;
  const winner = results.length > 0 && totalVotes > 0 && !isTie ? results[0] : null;
  const tiedCandidates = isTie ? results.filter((r) => r.voteCount === results[0].voteCount) : [];
  const elections = electionsApi.data || [];
  const currentElection = elections.find((e) => e.id === selectedElection);

  if (electionsApi.loading) return <div className="loading">Connecting to server...</div>;
  if (electionsApi.error) return <ErrorBlock message={electionsApi.error} onRetry={() => void load()} />;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Election Results</h1>
        <p className="page-subtitle">View live election results and vote counts</p>
      </div>

      <div className="filters-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div className="filter-box" style={{ flex: "1 1 320px" }}>
          <Filter className="filter-icon" />
          <select value={selectedElection} onChange={(e) => handleElectionChange(Number(e.target.value))}>
            {elections.map((election) => {
              const label = election.constituency?.name
                ? `${election.name} — ${election.constituency.name} (${election.constituency.district})`
                : election.name;
              return (
                <option key={election.id} value={election.id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={loadingResults}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "0.9rem"
          }}
        >
          <RefreshCw size={16} className={loadingResults ? "spin-animation" : ""} />
          {loadingResults ? "Updating..." : "Refresh Counts"}
        </button>
      </div>

      {currentElection && (
        <div style={{
          margin: "0.5rem 0 1.5rem",
          padding: "0.75rem 1rem",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#166534",
          fontSize: "0.9rem"
        }}>
          <CheckCircle2 size={18} color="#16a34a" />
          <div>
            Showing results for: <strong>{currentElection.name}</strong> — Constituency:{" "}
            <strong>{currentElection.constituency?.name ?? "General"}</strong> ({currentElection.constituency?.state})
          </div>
        </div>
      )}

      {totalVotes === 0 ? (
        <div className="stats-grid">
          <div className="stat-card"><BarChart3 className="stat-icon" /><span>Status</span><strong>No Votes Yet</strong></div>
          <div className="stat-card"><BarChart3 className="stat-icon" /><span>Total Votes</span><strong>0</strong></div>
        </div>
      ) : isTie ? (
        <div className="stats-grid">
          <div className="stat-card">
            <Trophy className="stat-icon" />
            <span>Result</span>
            <strong>Tie: {tiedCandidates.map((c) => c.candidateName).join(" & ")}</strong>
          </div>
          <div className="stat-card"><BarChart3 className="stat-icon" /><span>Tied Votes</span><strong>{results[0].voteCount} each</strong></div>
          <div className="stat-card"><BarChart3 className="stat-icon" /><span>Total Votes</span><strong>{totalVotes}</strong></div>
        </div>
      ) : winner ? (
        <div className="stats-grid">
          <div className="stat-card"><Trophy className="stat-icon" /><span>Leading Candidate</span><strong>{winner.candidateName}</strong></div>
          <div className="stat-card"><BarChart3 className="stat-icon" /><span>Leading Party</span><strong>{winner.partyName}</strong></div>
          <div className="stat-card"><BarChart3 className="stat-icon" /><span>Total Votes</span><strong>{totalVotes}</strong></div>
        </div>
      ) : null}

      <section className="panel">
        <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Vote Tally: {currentElection?.constituency?.name ?? currentElection?.name}</h2>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{totalVotes} total {totalVotes === 1 ? "vote" : "votes"} recorded</span>
        </div>
        {loadingResults ? (
          <div className="loading">Loading results...</div>
        ) : (
          <table>
            <thead><tr><th>Rank</th><th>Candidate</th><th>Party</th><th>Votes</th><th>Share</th></tr></thead>
            <tbody>
              {results.map((row, index) => {
                const percentage = totalVotes > 0 ? ((row.voteCount / totalVotes) * 100).toFixed(1) : "0";
                const isLeading = row.voteCount > 0 && row.voteCount === results[0].voteCount;
                return (
                  <tr key={row.candidateId}>
                    <td>{isLeading ? <Trophy size={18} className="stat-icon" /> : index + 1}</td>
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

      {results.length === 0 && (
        <div className="empty-state"><BarChart3 size={48} /><p>No candidates or results registered for this election.</p></div>
      )}
    </div>
  );
}