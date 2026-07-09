import { useEffect, useState } from "react";
import { api } from "../api";
import type { Constituency, Election, ResultRow } from "../types";
import { MapPin, Users } from "lucide-react";
import { useApi, ErrorBlock } from "../useApi";

export default function States() {
  const constituenciesApi = useApi<Constituency[]>();
  const electionsApi = useApi<Election[]>();
  const [selectedElection, setSelectedElection] = useState<number>(1);
  const [results, setResults] = useState<ResultRow[]>([]);

  const load = async () => {
    const [, e] = await Promise.all([
      constituenciesApi.fetch(() => api.getConstituencies() as Promise<Constituency[]>),
      electionsApi.fetch(() => api.getElections() as Promise<Election[]>)
    ]);
    if (e.length > 0) {
      setSelectedElection(e[0].id);
      const r = await api.getResults(e[0].id) as ResultRow[];
      setResults(r);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleElectionChange = async (electionId: number) => {
    setSelectedElection(electionId);
    try {
      const r = await api.getResults(electionId) as ResultRow[];
      setResults(r);
    } catch (error) {
      console.error("Failed to load results", error);
    }
  };

  const constituencies = constituenciesApi.data || [];
  const elections = electionsApi.data || [];

  const statesMap = constituencies.reduce((acc, c) => {
    if (!acc[c.state]) acc[c.state] = [];
    acc[c.state].push(c);
    return acc;
  }, {} as Record<string, Constituency[]>);

  if (constituenciesApi.loading) return <div className="loading">Connecting to server...</div>;
  if (constituenciesApi.error) return <ErrorBlock message={constituenciesApi.error} onRetry={() => void load()} />;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>States & Constituencies</h1>
        <p className="page-subtitle">View election results by state and constituency</p>
      </div>

      <div className="election-selector">
        <label>
          <span>Select Election</span>
          <select value={selectedElection} onChange={(e) => handleElectionChange(Number(e.target.value))}>
            {elections.map((e) => (<option key={e.id} value={e.id}>{e.name}</option>))}
          </select>
        </label>
      </div>

      <div className="states-list">
        {Object.entries(statesMap).map(([state, stateConstituencies]) => (
          <div key={state} className="state-card">
            <div className="state-header">
              <MapPin className="state-icon" />
              <h3 className="state-name">{state}</h3>
              <span className="state-count">{stateConstituencies.length} constituencies</span>
            </div>
            <div className="constituencies-list">
              {stateConstituencies.map((c) => (
                <div key={c.id} className="constituency-item">
                  <div className="constituency-info">
                    <h4 className="constituency-name">{c.name}</h4>
                    <p className="constituency-district">{c.district}</p>
                  </div>
                  <div className="constituency-stats">
                    <div className="mini-stat"><Users className="mini-stat-icon" /><span>{c.constituencyCode}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="results-summary">
        <h2 className="section-title">Election Results Summary</h2>
        <div className="results-table-container">
          <table className="results-table">
            <thead><tr><th>Candidate</th><th>Party</th><th>Votes</th></tr></thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.candidateId}><td>{row.candidateName}</td><td>{row.partyName}</td><td>{row.voteCount}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}