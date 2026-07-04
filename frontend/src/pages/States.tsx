import { useEffect, useState } from "react";
import { api } from "../api";
import type { Constituency, Election, ResultRow } from "../types";
import { MapPin, Users } from "lucide-react";

export default function States() {
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<number>(1);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [constituenciesData, electionsData] = await Promise.all([
          api.getConstituencies() as Promise<Constituency[]>,
          api.getElections() as Promise<Election[]>
        ]);
        setConstituencies(constituenciesData);
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
    try {
      const resultsData = await api.getResults(electionId) as ResultRow[];
      setResults(resultsData);
    } catch (error) {
      console.error("Failed to load results", error);
    }
  };

  // Group constituencies by state
  const statesMap = constituencies.reduce((acc, constituency) => {
    if (!acc[constituency.state]) {
      acc[constituency.state] = [];
    }
    acc[constituency.state].push(constituency);
    return acc;
  }, {} as Record<string, Constituency[]>);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name}
              </option>
            ))}
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
              {stateConstituencies.map((constituency) => (
                <div key={constituency.id} className="constituency-item">
                  <div className="constituency-info">
                    <h4 className="constituency-name">{constituency.name}</h4>
                    <p className="constituency-district">{constituency.district}</p>
                  </div>
                  <div className="constituency-stats">
                    <div className="mini-stat">
                      <Users className="mini-stat-icon" />
                      <span>{constituency.constituencyCode}</span>
                    </div>
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
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Party</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.candidateId}>
                  <td>{row.candidateName}</td>
                  <td>{row.partyName}</td>
                  <td>{row.voteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
