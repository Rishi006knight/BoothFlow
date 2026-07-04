import { useEffect, useState } from "react";
import { api } from "../api";
import type { Voter, Constituency } from "../types";
import { Search, Users, MapPin, Phone, Filter } from "lucide-react";

export default function Voters() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [selectedConstituency, setSelectedConstituency] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [votersData, constituenciesData] = await Promise.all([
          api.getVoters() as Promise<Voter[]>,
          api.getConstituencies() as Promise<Constituency[]>
        ]);
        setVoters(votersData);
        setConstituencies(constituenciesData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  const filteredVoters = voters.filter((voter) => {
    const matchesConstituency = selectedConstituency === "all" || voter.constituency.id === Number(selectedConstituency);
    const matchesSearch = voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          voter.voterCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesConstituency && matchesSearch;
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Voters</h1>
        <p className="page-subtitle">View registered voters and their details</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search voters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter className="filter-icon" />
          <select value={selectedConstituency} onChange={(e) => setSelectedConstituency(e.target.value)}>
            <option value="all">All Constituencies</option>
            {constituencies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <section className="panel">
        <div className="panel-header">
          <h2>Registered Voters ({filteredVoters.length})</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Voter Code</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Constituency</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoters.map((voter) => (
              <tr key={voter.id}>
                <td><span className="status-badge active">{voter.voterCode}</span></td>
                <td>
                  <div className="voter-name-cell">
                    <div className="candidate-avatar">{voter.name.split(" ").map((n) => n[0]).join("")}</div>
                    {voter.name}
                  </div>
                </td>
                <td>{voter.gender}</td>
                <td>
                  <span className="voter-phone">
                    <Phone size={14} />
                    {voter.phone}
                  </span>
                </td>
                <td>
                  <span className="voter-constituency">
                    <MapPin size={14} />
                    {voter.constituency.name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {filteredVoters.length === 0 && (
        <div className="empty-state">
          <Users size={48} />
          <p>No voters found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
