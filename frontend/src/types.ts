export type Constituency = {
  id: number;
  constituencyCode: string;
  name: string;
  district: string;
  state: string;
};

export type PollingStation = {
  id: number;
  stationCode: string;
  name: string;
  location: string;
  capacity: number;
  constituency: Constituency;
};

export type Party = {
  id: number;
  partyCode: string;
  name: string;
  symbol: string;
};

export type Election = {
  id: number;
  electionCode: string;
  name: string;
  type: string;
  electionDate: string;
  constituency: Constituency;
};

export type Candidate = {
  id: number;
  candidateCode: string;
  name: string;
  age: number;
  qualification: string;
  party: Party;
  election: Election;
};

export type Voter = {
  id: number;
  voterCode: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  constituency: Constituency;
};

export type ResultRow = {
  candidateId: number;
  candidateName: string;
  partyName: string;
  voteCount: number;
};

export type Dashboard = {
  constituencies: number;
  pollingStations: number;
  voters: number;
  parties: number;
  elections: number;
  candidates: number;
  votes: number;
  latestResults: {
    electionId: number;
    electionName: string;
    leadingCandidate: string;
    partyName: string;
    voteCount: number;
  }[];
};
