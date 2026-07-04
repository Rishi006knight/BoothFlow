package com.election.ems.web;

import com.election.ems.entity.Candidate;
import com.election.ems.entity.Constituency;
import com.election.ems.entity.Election;
import com.election.ems.entity.Party;
import com.election.ems.entity.PollingStation;
import com.election.ems.entity.State;
import com.election.ems.entity.Vote;
import com.election.ems.entity.Voter;
import com.election.ems.service.ElectionService;
import com.election.ems.web.SystemInfo;
import com.election.ems.web.dto.CandidateRequest;
import com.election.ems.web.dto.CastVoteRequest;
import com.election.ems.web.dto.ConstituencyRequest;
import com.election.ems.web.dto.ElectionRequest;
import com.election.ems.web.dto.PartyRequest;
import com.election.ems.web.dto.PollingStationRequest;
import com.election.ems.web.dto.VoterRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ElectionController {

    private final ElectionService electionService;

    public ElectionController(ElectionService electionService) {
        this.electionService = electionService;
    }

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {
        return electionService.getDashboard();
    }

    @GetMapping("/constituencies")
    public List<Constituency> constituencies() {
        return electionService.getConstituencies();
    }

    @PostMapping("/constituencies")
    public Constituency createConstituency(@Valid @RequestBody ConstituencyRequest request) {
        return electionService.createConstituency(request);
    }

    @GetMapping("/polling-stations")
    public List<PollingStation> pollingStations() {
        return electionService.getPollingStations();
    }

    @PostMapping("/polling-stations")
    public PollingStation createPollingStation(@Valid @RequestBody PollingStationRequest request) {
        return electionService.createPollingStation(request);
    }

    @GetMapping("/parties")
    public List<Party> parties() {
        return electionService.getParties();
    }

    @PostMapping("/parties")
    public Party createParty(@Valid @RequestBody PartyRequest request) {
        return electionService.createParty(request);
    }

    @GetMapping("/elections")
    public List<Election> elections() {
        return electionService.getElections();
    }

    @PostMapping("/elections")
    public Election createElection(@Valid @RequestBody ElectionRequest request) {
        return electionService.createElection(request);
    }

    @GetMapping("/candidates")
    public List<Candidate> candidates(@RequestParam(required = false) Long electionId) {
        return electionService.getCandidates(electionId);
    }

    @PostMapping("/candidates")
    public Candidate createCandidate(@Valid @RequestBody CandidateRequest request) {
        return electionService.createCandidate(request);
    }

    @GetMapping("/voters")
    public List<Voter> voters(@RequestParam(required = false) Long constituencyId) {
        return electionService.getVoters(constituencyId);
    }

    @PostMapping("/voters")
    public Voter createVoter(@Valid @RequestBody VoterRequest request) {
        return electionService.createVoter(request);
    }

    @GetMapping("/results")
    public List<ResultRow> results(@RequestParam Long electionId) {
        return electionService.getResults(electionId);
    }

    @PostMapping("/votes")
    public Vote castVote(@Valid @RequestBody CastVoteRequest request) {
        return electionService.castVote(request);
    }

    @GetMapping("/states")
    public List<State> states() {
        return electionService.getStates();
    }

    @GetMapping("/states/{id}")
    public State state(@PathVariable Long id) {
        return electionService.getState(id);
    }

    @GetMapping("/about")
    public SystemInfo about() {
        return electionService.getSystemInfo();
    }
}
