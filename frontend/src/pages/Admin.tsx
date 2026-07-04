import { FormEvent, ReactNode, useEffect, useState } from "react";
import { api } from "../api";
import type {
  Candidate,
  Constituency,
  Dashboard,
  Election,
  Party,
  PollingStation,
  ResultRow,
  Voter
} from "../types";
import { Settings, Database, Users, Vote as VoteIcon, Building2, Calendar, UserPlus } from "lucide-react";
import AdminLogin from "../components/AdminLogin";

type FormState = Record<string, string>;

const initialForms: Record<string, FormState> = {
  constituency: { constituencyCode: "", name: "", district: "", state: "" },
  pollingStation: { stationCode: "", name: "", location: "", capacity: "", constituencyId: "" },
  party: { partyCode: "", name: "", symbol: "" },
  election: { electionCode: "", name: "", type: "", electionDate: "", constituencyId: "" },
  candidate: { candidateCode: "", name: "", age: "", qualification: "", partyId: "", electionId: "" },
  voter: { voterCode: "", name: "", dob: "", gender: "", phone: "", address: "", constituencyId: "" },
  vote: { voterId: "", candidateId: "", electionId: "", pollingStationId: "" }
};

export default function Admin() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [pollingStations, setPollingStations] = useState<PollingStation[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [voters, setVoters] = useState<Voter[]>([]);
  const [selectedElectionId, setSelectedElectionId] = useState<number>(1);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [forms, setForms] = useState(initialForms);
  const [message, setMessage] = useState<string>("System ready.");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  async function loadAll() {
    setLoading(true);
    try {
      const [
        dashboardData,
        constituencyData,
        pollingData,
        partyData,
        electionData,
        candidateData,
        voterData
      ] = await Promise.all([
        api.getDashboard() as Promise<Dashboard>,
        api.getConstituencies() as Promise<Constituency[]>,
        api.getPollingStations() as Promise<PollingStation[]>,
        api.getParties() as Promise<Party[]>,
        api.getElections() as Promise<Election[]>,
        api.getCandidates() as Promise<Candidate[]>,
        api.getVoters() as Promise<Voter[]>
      ]);

      setDashboard(dashboardData);
      setConstituencies(constituencyData);
      setPollingStations(pollingData);
      setParties(partyData);
      setElections(electionData);
      setCandidates(candidateData);
      setVoters(voterData);

      const targetElectionId = electionData[0]?.id ?? selectedElectionId;
      setSelectedElectionId(targetElectionId);
      if (targetElectionId) {
        const resultData = (await api.getResults(targetElectionId)) as ResultRow[];
        setResults(resultData);
      } else {
        setResults([]);
      }
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAll();
  }, []);

  useEffect(() => {
    if (!selectedElectionId) {
      return;
    }
    api
      .getResults(selectedElectionId)
      .then((data) => setResults(data as ResultRow[]))
      .catch((error) => setMessage((error as Error).message));
  }, [selectedElectionId]);

  function updateForm(formKey: string, field: string, value: string) {
    setForms((current) => ({
      ...current,
      [formKey]: {
        ...current[formKey],
        [field]: value
      }
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    formKey: keyof typeof initialForms,
    action: (body: unknown) => Promise<unknown>
  ) {
    event.preventDefault();
    try {
      const form = forms[formKey];
      const body = Object.fromEntries(
        Object.entries(form).map(([key, value]) => {
          if (["capacity", "constituencyId", "partyId", "electionId", "age", "voterId", "candidateId", "pollingStationId"].includes(key)) {
            return [key, Number(value)];
          }
          return [key, value];
        })
      );

      await action(body);
      setForms((current) => ({ ...current, [formKey]: initialForms[formKey] }));
      setMessage(`${formKey} saved successfully.`);
      await loadAll();
    } catch (error) {
      setMessage((error as Error).message);
    }
  }

  const electionCandidates = candidates.filter((candidate) => candidate.election.id === selectedElectionId);
  const electionPollingStations = pollingStations.filter(
    (station) => station.constituency.id === elections.find((election) => election.id === selectedElectionId)?.constituency.id
  );
  const electionVoters = voters.filter(
    (voter) => voter.constituency.id === elections.find((election) => election.id === selectedElectionId)?.constituency.id
  );

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Database },
    { id: "constituency", label: "Constituencies", icon: Building2 },
    { id: "polling", label: "Polling Stations", icon: Settings },
    { id: "party", label: "Parties", icon: VoteIcon },
    { id: "election", label: "Elections", icon: Calendar },
    { id: "candidate", label: "Candidates", icon: Users },
    { id: "voter", label: "Voters", icon: UserPlus },
    { id: "vote", label: "Cast Vote", icon: VoteIcon }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Admin Panel</h1>
        <p className="page-subtitle">Manage election data and operations</p>
      </div>

      <div className="admin-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="tab-icon" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="admin-content">
        {activeTab === "dashboard" && (
          <div className="admin-dashboard">
            <div className="status-message">
              <span>Status:</span>
              <strong>{loading ? "Loading data..." : message}</strong>
            </div>
            <div className="stats-grid">
              {dashboard &&
                [
                  ["Constituencies", dashboard.constituencies],
                  ["Polling Stations", dashboard.pollingStations],
                  ["Voters", dashboard.voters],
                  ["Parties", dashboard.parties],
                  ["Elections", dashboard.elections],
                  ["Candidates", dashboard.candidates],
                  ["Votes Cast", dashboard.votes]
                ].map(([label, value]) => (
                  <article key={label} className="stat-card">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </article>
                ))}
            </div>
            <div className="panel">
              <div className="panel-header">
                <h2>Live Results</h2>
                <select value={selectedElectionId} onChange={(event) => setSelectedElectionId(Number(event.target.value))}>
                  {elections.map((election) => (
                    <option key={election.id} value={election.id}>
                      {election.name}
                    </option>
                  ))}
                </select>
              </div>
              <table>
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
          </div>
        )}

        {activeTab === "constituency" && (
          <FormCard
            title="Add Constituency"
            onSubmit={(event) => handleSubmit(event, "constituency", api.createConstituency)}
            fields={[
              ["constituencyCode", "Constituency Code"],
              ["name", "Name"],
              ["district", "District"],
              ["state", "State"]
            ]}
            values={forms.constituency}
            onChange={updateForm}
            formKey="constituency"
          />
        )}

        {activeTab === "polling" && (
          <FormCard
            title="Add Polling Station"
            onSubmit={(event) => handleSubmit(event, "pollingStation", api.createPollingStation)}
            fields={[
              ["stationCode", "Station Code"],
              ["name", "Name"],
              ["location", "Location"],
              ["capacity", "Capacity"]
            ]}
            values={forms.pollingStation}
            onChange={updateForm}
            formKey="pollingStation"
          >
            <SelectField
              label="Constituency"
              value={forms.pollingStation.constituencyId}
              onChange={(value) => updateForm("pollingStation", "constituencyId", value)}
              options={constituencies.map((item) => ({ value: item.id, label: item.name }))}
            />
          </FormCard>
        )}

        {activeTab === "party" && (
          <FormCard
            title="Add Party"
            onSubmit={(event) => handleSubmit(event, "party", api.createParty)}
            fields={[
              ["partyCode", "Party Code"],
              ["name", "Party Name"],
              ["symbol", "Symbol"]
            ]}
            values={forms.party}
            onChange={updateForm}
            formKey="party"
          />
        )}

        {activeTab === "election" && (
          <FormCard
            title="Add Election"
            onSubmit={(event) => handleSubmit(event, "election", api.createElection)}
            fields={[
              ["electionCode", "Election Code"],
              ["name", "Election Name"],
              ["type", "Type"],
              ["electionDate", "Election Date", "date"]
            ]}
            values={forms.election}
            onChange={updateForm}
            formKey="election"
          >
            <SelectField
              label="Constituency"
              value={forms.election.constituencyId}
              onChange={(value) => updateForm("election", "constituencyId", value)}
              options={constituencies.map((item) => ({ value: item.id, label: item.name }))}
            />
          </FormCard>
        )}

        {activeTab === "candidate" && (
          <FormCard
            title="Add Candidate"
            onSubmit={(event) => handleSubmit(event, "candidate", api.createCandidate)}
            fields={[
              ["candidateCode", "Candidate Code"],
              ["name", "Name"],
              ["age", "Age", "number"],
              ["qualification", "Qualification"]
            ]}
            values={forms.candidate}
            onChange={updateForm}
            formKey="candidate"
          >
            <SelectField
              label="Party"
              value={forms.candidate.partyId}
              onChange={(value) => updateForm("candidate", "partyId", value)}
              options={parties.map((item) => ({ value: item.id, label: item.name }))}
            />
            <SelectField
              label="Election"
              value={forms.candidate.electionId}
              onChange={(value) => updateForm("candidate", "electionId", value)}
              options={elections.map((item) => ({ value: item.id, label: item.name }))}
            />
          </FormCard>
        )}

        {activeTab === "voter" && (
          <FormCard
            title="Register Voter"
            onSubmit={(event) => handleSubmit(event, "voter", api.createVoter)}
            fields={[
              ["voterCode", "Voter Code"],
              ["name", "Name"],
              ["dob", "Date of Birth", "date"],
              ["gender", "Gender"],
              ["phone", "Phone"],
              ["address", "Address"]
            ]}
            values={forms.voter}
            onChange={updateForm}
            formKey="voter"
          >
            <SelectField
              label="Constituency"
              value={forms.voter.constituencyId}
              onChange={(value) => updateForm("voter", "constituencyId", value)}
              options={constituencies.map((item) => ({ value: item.id, label: item.name }))}
            />
          </FormCard>
        )}

        {activeTab === "vote" && (
          <div className="panel vote-panel">
            <div className="panel-header">
              <h2>Cast Vote</h2>
              <p>One voter can vote only once per election.</p>
            </div>
            <form className="vote-form" onSubmit={(event) => handleSubmit(event, "vote", api.castVote)}>
              <SelectField
                label="Election"
                value={forms.vote.electionId}
                onChange={(value) => {
                  updateForm("vote", "electionId", value);
                  setSelectedElectionId(Number(value));
                }}
                options={elections.map((item) => ({ value: item.id, label: item.name }))}
              />
              <SelectField
                label="Voter"
                value={forms.vote.voterId}
                onChange={(value) => updateForm("vote", "voterId", value)}
                options={electionVoters.map((item) => ({ value: item.id, label: `${item.name} (${item.voterCode})` }))}
              />
              <SelectField
                label="Candidate"
                value={forms.vote.candidateId}
                onChange={(value) => updateForm("vote", "candidateId", value)}
                options={electionCandidates.map((item) => ({ value: item.id, label: `${item.name} - ${item.party.name}` }))}
              />
              <SelectField
                label="Polling Station"
                value={forms.vote.pollingStationId}
                onChange={(value) => updateForm("vote", "pollingStationId", value)}
                options={electionPollingStations.map((item) => ({ value: item.id, label: item.name }))}
              />
              <button type="submit">Submit Vote</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

type FormCardProps = {
  title: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  fields: [string, string, string?][];
  values: FormState;
  onChange: (formKey: string, field: string, value: string) => void;
  formKey: string;
  children?: ReactNode;
};

function FormCard({ title, onSubmit, fields, values, onChange, formKey, children }: FormCardProps) {
  return (
    <form className="panel form-card" onSubmit={onSubmit}>
      <h2>{title}</h2>
      {fields.map(([name, label, type]) => (
        <label key={name}>
          <span>{label}</span>
          <input
            type={type ?? "text"}
            value={values[name]}
            onChange={(event) => onChange(formKey, name, event.target.value)}
            required
          />
        </label>
      ))}
      {children}
      <button type="submit">Save</button>
    </form>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: number; label: string }[];
};

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} required>
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
