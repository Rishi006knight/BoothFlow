package com.election.ems.service;

import com.election.ems.entity.Candidate;
import com.election.ems.entity.Constituency;
import com.election.ems.entity.Election;
import com.election.ems.entity.Party;
import com.election.ems.entity.PollingStation;
import com.election.ems.entity.Vote;
import com.election.ems.entity.Voter;
import com.election.ems.entity.State;
import com.election.ems.repository.CandidateRepository;
import com.election.ems.repository.ConstituencyRepository;
import com.election.ems.repository.ElectionRepository;
import com.election.ems.repository.PartyRepository;
import com.election.ems.repository.PollingStationRepository;
import com.election.ems.repository.StateRepository;
import com.election.ems.repository.VoteRepository;
import com.election.ems.repository.VoterRepository;
import com.election.ems.config.DatabaseInitializer;
import com.election.ems.web.DashboardResponse;
import com.election.ems.web.ResultRow;
import com.election.ems.web.dto.CandidateRequest;
import com.election.ems.web.dto.CastVoteRequest;
import com.election.ems.web.dto.ConstituencyRequest;
import com.election.ems.web.dto.ElectionRequest;
import com.election.ems.web.dto.PartyRequest;
import com.election.ems.web.dto.PollingStationRequest;
import com.election.ems.web.dto.VoterRequest;
import com.election.ems.exception.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ElectionService {

    private final ConstituencyRepository constituencyRepository;
    private final PollingStationRepository pollingStationRepository;
    private final PartyRepository partyRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final VoterRepository voterRepository;
    private final VoteRepository voteRepository;
    private final StateRepository stateRepository;

    private final DatabaseInitializer databaseInitializer;

    public ElectionService(ConstituencyRepository constituencyRepository,
                           PollingStationRepository pollingStationRepository,
                           PartyRepository partyRepository,
                           ElectionRepository electionRepository,
                           CandidateRepository candidateRepository,
                           VoterRepository voterRepository,
                           VoteRepository voteRepository,
                           StateRepository stateRepository,
                           DatabaseInitializer databaseInitializer) {
        this.constituencyRepository = constituencyRepository;
        this.pollingStationRepository = pollingStationRepository;
        this.partyRepository = partyRepository;
        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
        this.voterRepository = voterRepository;
        this.voteRepository = voteRepository;
        this.stateRepository = stateRepository;
        this.databaseInitializer = databaseInitializer;
    }

    public void seedDatabase() {
        databaseInitializer.seed(true);
    }

    public List<Constituency> getConstituencies() {
        return constituencyRepository.findAll().stream()
                .sorted(Comparator.comparing(Constituency::getName))
                .toList();
    }

    public List<PollingStation> getPollingStations() {
        return pollingStationRepository.findAll();
    }

    public List<Party> getParties() {
        return partyRepository.findAll();
    }

    public List<Election> getElections() {
        return electionRepository.findAll();
    }

    public List<Candidate> getCandidates(Long electionId) {
        if (electionId != null) {
            return candidateRepository.findByElectionId(electionId);
        }
        return candidateRepository.findAll();
    }

    public List<Voter> getVoters(Long constituencyId) {
        if (constituencyId != null) {
            return voterRepository.findByConstituencyId(constituencyId);
        }
        return voterRepository.findAll();
    }

    public List<State> getStates() {
        return stateRepository.findAll();
    }

    public State getState(Long id) {
        return stateRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("State not found: " + id));
    }

    public List<ResultRow> getResults(Long electionId) {
        List<Vote> votes = voteRepository.findByElectionId(electionId);
        
        // Group by Candidate ID to ensure proper aggregation regardless of proxy identity
        java.util.Map<Long, Long> voteCounts = votes.stream()
                .filter(v -> v.getCandidate() != null && v.getCandidate().getId() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        v -> v.getCandidate().getId(),
                        java.util.stream.Collectors.counting()
                ));

        // Fetch all candidates registered for this election so even candidates with 0 votes appear
        List<Candidate> candidates = candidateRepository.findByElectionId(electionId);
        
        // Also include any candidate that received votes in this election even if query missed them
        java.util.Set<Long> registeredCandidateIds = candidates.stream()
                .map(Candidate::getId)
                .collect(java.util.stream.Collectors.toSet());
        List<Candidate> allContestingCandidates = new ArrayList<>(candidates);
        for (Long candidateId : voteCounts.keySet()) {
            if (!registeredCandidateIds.contains(candidateId)) {
                candidateRepository.findById(candidateId).ifPresent(allContestingCandidates::add);
            }
        }
        
        return allContestingCandidates.stream()
                .map(candidate -> new ResultRow(
                        candidate.getId(),
                        candidate.getName(),
                        candidate.getParty() != null ? candidate.getParty().getName() : "Independent",
                        voteCounts.getOrDefault(candidate.getId(), 0L)
                ))
                .sorted(java.util.Comparator.comparingLong(ResultRow::voteCount).reversed()
                        .thenComparing(ResultRow::candidateName))
                .toList();
    }

    public DashboardResponse getDashboard() {
        List<DashboardResponse.ResultCard> resultCards = new ArrayList<>();
        for (Election election : electionRepository.findAll()) {
            List<ResultRow> results = getResults(election.getId());
            if (!results.isEmpty()) {
                ResultRow top = results.get(0);
                if (top.voteCount() > 0) {
                    boolean isTie = results.size() > 1 && results.get(1).voteCount() == top.voteCount();
                    String electionDisplayName = election.getConstituency() != null
                            ? election.getName() + " — " + election.getConstituency().getName()
                            : election.getName();
                    resultCards.add(new DashboardResponse.ResultCard(
                            election.getId(),
                            electionDisplayName,
                            isTie ? top.candidateName() + " (Tied with " + results.get(1).candidateName() + ")" : top.candidateName(),
                            isTie ? "Tied" : top.partyName(),
                            top.voteCount()
                    ));
                }
            }
        }

        return new DashboardResponse(
                constituencyRepository.count(),
                pollingStationRepository.count(),
                voterRepository.count(),
                partyRepository.count(),
                electionRepository.count(),
                candidateRepository.count(),
                voteRepository.count(),
                resultCards
        );
    }

    @Transactional
    public Constituency createConstituency(ConstituencyRequest request) {
        Constituency constituency = new Constituency();
        constituency.setConstituencyCode(request.constituencyCode());
        constituency.setName(request.name());
        constituency.setDistrict(request.district());
        constituency.setState(request.state());
        return constituencyRepository.save(constituency);
    }

    @Transactional
    public PollingStation createPollingStation(PollingStationRequest request) {
        PollingStation pollingStation = new PollingStation();
        pollingStation.setStationCode(request.stationCode());
        pollingStation.setName(request.name());
        pollingStation.setLocation(request.location());
        pollingStation.setCapacity(request.capacity());
        pollingStation.setConstituency(getConstituency(request.constituencyId()));
        return pollingStationRepository.save(pollingStation);
    }

    @Transactional
    public Party createParty(PartyRequest request) {
        Party party = new Party();
        party.setPartyCode(request.partyCode());
        party.setName(request.name());
        party.setSymbol(request.symbol());
        return partyRepository.save(party);
    }

    @Transactional
    public Election createElection(ElectionRequest request) {
        Election election = new Election();
        election.setElectionCode(request.electionCode());
        election.setName(request.name());
        election.setType(request.type());
        election.setElectionDate(request.electionDate());
        election.setConstituency(getConstituency(request.constituencyId()));
        return electionRepository.save(election);
    }

    @Transactional
    public Candidate createCandidate(CandidateRequest request) {
        Candidate candidate = new Candidate();
        candidate.setCandidateCode(request.candidateCode());
        candidate.setName(request.name());
        candidate.setAge(request.age());
        candidate.setQualification(request.qualification());
        candidate.setParty(getParty(request.partyId()));
        candidate.setElection(getElection(request.electionId()));
        return candidateRepository.save(candidate);
    }

    @Transactional
    public Voter createVoter(VoterRequest request) {
        Voter voter = new Voter();
        voter.setVoterCode(request.voterCode());
        voter.setName(request.name());
        voter.setDob(request.dob());
        voter.setGender(request.gender());
        voter.setPhone(request.phone());
        voter.setAddress(request.address());
        voter.setConstituency(getConstituency(request.constituencyId()));
        return voterRepository.save(voter);
    }

    @Transactional
    public Vote castVote(CastVoteRequest request) {
        Voter voter = getVoter(request.voterId());
        Candidate candidate = getCandidate(request.candidateId());
        Election election = getElection(request.electionId());
        PollingStation pollingStation = getPollingStation(request.pollingStationId());

        if (!voteRepository.findByVoterIdAndElectionId(voter.getId(), election.getId()).isEmpty()) {
            throw new IllegalArgumentException("This voter has already voted in the selected election.");
        }
        if (candidate.getElection() == null || !election.getId().equals(candidate.getElection().getId())) {
            throw new IllegalArgumentException("Candidate does not belong to the selected election.");
        }
        if (voter.getConstituency() == null || election.getConstituency() == null
                || !voter.getConstituency().getId().equals(election.getConstituency().getId())) {
            String voterConst = voter.getConstituency() != null ? voter.getConstituency().getName() : "Unknown";
            String electionConst = election.getConstituency() != null ? election.getConstituency().getName() : "Unknown";
            throw new IllegalArgumentException("Voter is registered in " + voterConst
                    + ", but the selected election is for " + electionConst + ".");
        }
        if (pollingStation.getConstituency() == null || election.getConstituency() == null
                || !pollingStation.getConstituency().getId().equals(election.getConstituency().getId())) {
            String stationConst = pollingStation.getConstituency() != null ? pollingStation.getConstituency().getName() : "Unknown";
            String electionConst = election.getConstituency() != null ? election.getConstituency().getName() : "Unknown";
            throw new IllegalArgumentException("Anomaly prevented: Polling station '" + pollingStation.getName()
                    + "' is in " + stationConst
                    + ", but the selected election is for " + electionConst + ".");
        }

        Vote vote = new Vote();
        vote.setVoteNumber("VOTE-" + System.currentTimeMillis());
        vote.setTimestamp(LocalDateTime.now());
        vote.setVoter(voter);
        vote.setCandidate(candidate);
        vote.setElection(election);
        vote.setPollingStation(pollingStation);
        return voteRepository.save(vote);
    }

    private Constituency getConstituency(Long id) {
        return constituencyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Constituency not found: " + id));
    }

    private Party getParty(Long id) {
        return partyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Party not found: " + id));
    }

    private Election getElection(Long id) {
        return electionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Election not found: " + id));
    }

    private Candidate getCandidate(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Candidate not found: " + id));
    }

    private Voter getVoter(Long id) {
        return voterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Voter not found: " + id));
    }

    private PollingStation getPollingStation(Long id) {
        return pollingStationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Polling station not found: " + id));
    }
}
