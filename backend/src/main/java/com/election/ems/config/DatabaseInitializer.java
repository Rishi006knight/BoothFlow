package com.election.ems.config;

import com.election.ems.entity.*;
import com.election.ems.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final StateRepository stateRepository;
    private final ConstituencyRepository constituencyRepository;
    private final PollingStationRepository pollingStationRepository;
    private final PartyRepository partyRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final VoterRepository voterRepository;
    private final VoteRepository voteRepository;
    private final MongoOperations mongoOperations;

    public DatabaseInitializer(StateRepository stateRepository,
                               ConstituencyRepository constituencyRepository,
                               PollingStationRepository pollingStationRepository,
                               PartyRepository partyRepository,
                               ElectionRepository electionRepository,
                               CandidateRepository candidateRepository,
                               VoterRepository voterRepository,
                               VoteRepository voteRepository,
                               MongoOperations mongoOperations) {
        this.stateRepository = stateRepository;
        this.constituencyRepository = constituencyRepository;
        this.pollingStationRepository = pollingStationRepository;
        this.partyRepository = partyRepository;
        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
        this.voterRepository = voterRepository;
        this.voteRepository = voteRepository;
        this.mongoOperations = mongoOperations;
    }

    @Override
    public void run(String... args) throws Exception {
        seed(false);
    }

    public synchronized void seed(boolean clearFirst) {
        if (clearFirst) {
            voteRepository.deleteAll();
            voterRepository.deleteAll();
            candidateRepository.deleteAll();
            electionRepository.deleteAll();
            pollingStationRepository.deleteAll();
            partyRepository.deleteAll();
            constituencyRepository.deleteAll();
            stateRepository.deleteAll();
            mongoOperations.dropCollection(DatabaseSequence.class);
        }

        if (stateRepository.count() > 0) {
            // Already seeded
            return;
        }

        // Seed States
        State tn = stateRepository.save(new State("Tamil Nadu", "TN", 39));
        State kl = stateRepository.save(new State("Kerala", "KL", 20));
        State ka = stateRepository.save(new State("Karnataka", "KA", 28));
        State ap = stateRepository.save(new State("Andhra Pradesh", "AP", 25));
        State ts = stateRepository.save(new State("Telangana", "TS", 17));

        // Seed Constituencies
        // Tamil Nadu Constituencies
        Constituency tn1 = createConstituency("TN-001", "Chennai Central", "Chennai", "Tamil Nadu");
        Constituency tn2 = createConstituency("TN-002", "Chennai South", "Chennai", "Tamil Nadu");
        Constituency tn3 = createConstituency("TN-003", "Coimbatore North", "Coimbatore", "Tamil Nadu");
        Constituency tn4 = createConstituency("TN-004", "Madurai East", "Madurai", "Tamil Nadu");
        Constituency tn5 = createConstituency("TN-005", "Salem City", "Salem", "Tamil Nadu");
        
        // Kerala Constituencies
        Constituency kl1 = createConstituency("KL-001", "Thiruvananthapuram Central", "Thiruvananthapuram", "Kerala");
        Constituency kl2 = createConstituency("KL-002", "Ernakulam", "Ernakulam", "Kerala");
        Constituency kl3 = createConstituency("KL-003", "Kozhikode North", "Kozhikode", "Kerala");
        Constituency kl4 = createConstituency("KL-004", "Thrissur", "Thrissur", "Kerala");
        Constituency kl5 = createConstituency("KL-005", "Kollam", "Kollam", "Kerala");

        // Karnataka Constituencies
        Constituency ka1 = createConstituency("KA-001", "Bangalore Central", "Bangalore Urban", "Karnataka");
        Constituency ka2 = createConstituency("KA-002", "Bangalore South", "Bangalore Urban", "Karnataka");
        Constituency ka3 = createConstituency("KA-003", "Mysore", "Mysore", "Karnataka");
        Constituency ka4 = createConstituency("KA-004", "Hubli-Dharwad", "Dharwad", "Karnataka");
        Constituency ka5 = createConstituency("KA-005", "Mangalore", "Dakshina Kannada", "Karnataka");

        // Andhra Pradesh Constituencies
        Constituency ap1 = createConstituency("AP-001", "Visakhapatnam East", "Visakhapatnam", "Andhra Pradesh");
        Constituency ap2 = createConstituency("AP-002", "Vijayawada Central", "Krishna", "Andhra Pradesh");
        Constituency ap3 = createConstituency("AP-003", "Guntur West", "Guntur", "Andhra Pradesh");
        Constituency ap4 = createConstituency("AP-004", "Tirupati", "Chittoor", "Andhra Pradesh");
        Constituency ap5 = createConstituency("AP-005", "Rajahmundry", "East Godavari", "Andhra Pradesh");

        // Telangana Constituencies
        Constituency ts1 = createConstituency("TS-001", "Hyderabad Central", "Hyderabad", "Telangana");
        Constituency ts2 = createConstituency("TS-002", "Secunderabad", "Hyderabad", "Telangana");
        Constituency ts3 = createConstituency("TS-003", "Warangal East", "Warangal Urban", "Telangana");
        Constituency ts4 = createConstituency("TS-004", "Karimnagar", "Karimnagar", "Telangana");
        Constituency ts5 = createConstituency("TS-005", "Nizamabad", "Nizamabad", "Telangana");

        // Polling Stations
        createPollingStation("PS-TN-001-A", "Government Higher Secondary School", "T Nagar, Chennai", 1200, tn1);
        createPollingStation("PS-TN-001-B", "Anna Nagar Community Hall", "Anna Nagar, Chennai", 1000, tn1);
        createPollingStation("PS-TN-002-A", "Adyar Government School", "Adyar, Chennai", 900, tn2);
        createPollingStation("PS-TN-002-B", "Besant Nagar Women College", "Besant Nagar, Chennai", 850, tn2);
        createPollingStation("PS-TN-003-A", "PSG College of Arts", "Peelamedu, Coimbatore", 1100, tn3);
        createPollingStation("PS-TN-003-B", "Government Arts College", "Coimbatore City", 950, tn3);
        createPollingStation("PS-TN-004-A", "Madurai Kamaraj University", "Palkalai Nagar, Madurai", 1050, tn4);
        createPollingStation("PS-TN-004-B", "Thiagarajar College", "Madurai Main", 900, tn4);
        createPollingStation("PS-TN-005-A", "Salem Government School", "Salem Town", 1000, tn5);
        createPollingStation("PS-TN-005-B", "Sona College Hall", "Salem Junction", 850, tn5);
        
        createPollingStation("PS-KL-001-A", "Government VHSS Thiruvananthapuram", "Thycaud, TVM", 1100, kl1);
        createPollingStation("PS-KL-001-B", "SMV School Hall", "Thycaud, TVM", 950, kl1);
        createPollingStation("PS-KL-002-A", "Maharajas College Ernakulam", "Ernakulam South", 1050, kl2);
        createPollingStation("PS-KL-002-B", "St. Alberts School", "Ernakulam North", 900, kl2);
        
        createPollingStation("PS-KA-001-A", "Mount Carmel College", "Palace Road, Bangalore", 1200, ka1);
        createPollingStation("PS-KA-001-B", "Central College Bangalore", "Bangalore Main", 1050, ka1);
        
        createPollingStation("PS-AP-001-A", "Andhra University Engineering College", "Visakhapatnam Beach Road", 1100, ap1);
        createPollingStation("PS-AP-001-B", "Government School Seethammadhara", "Vizag City", 950, ap1);

        createPollingStation("PS-TS-001-A", "Nizam College", "Basheer Bagh, Hyderabad", 1200, ts1);
        createPollingStation("PS-TS-001-B", "Osmania University Campus", "Tarnaka, Hyderabad", 1050, ts1);

        // Parties
        Party dmk = createParty("DMK", "Dravida Munnetra Kazhagam", "Rising Sun");
        Party aiadmk = createParty("AIADMK", "All India Anna Dravida Munnetra Kazhagam", "Two Leaves");
        Party bjp = createParty("BJP", "Bharatiya Janata Party", "Lotus");
        Party inc = createParty("INC", "Indian National Congress", "Hand");
        Party pmk = createParty("PMK", "Pattali Makkal Katchi", "Mango");
        Party cpim = createParty("CPIM", "Communist Party of India (Marxist)", "Hammer and Sickle");
        Party cpi = createParty("CPI", "Communist Party of India", "Ears of Corn and Sickle");
        Party bjd = createParty("BJD", "Biju Janata Dal", "Conch");
        Party tdp = createParty("TDP", "Telugu Desam Party", "Bicycle");
        Party ysrcp = createParty("YSRCP", "Yuvajana Sramika Rythu Congress Party", "Fan");
        Party trs = createParty("TRS", "Telangana Rashtra Samithi", "Car");
        Party jds = createParty("JD-S", "Janata Dal (Secular)", "Female Farmer");

        // Elections
        // TN
        Election tnEl1 = createElection("TN-ASM-2026-001", "Tamil Nadu Assembly Election 2026", "Assembly", LocalDate.of(2026, 5, 6), tn1);
        Election tnEl2 = createElection("TN-ASM-2026-002", "Tamil Nadu Assembly Election 2026", "Assembly", LocalDate.of(2026, 5, 6), tn2);
        Election tnEl3 = createElection("TN-ASM-2026-003", "Tamil Nadu Assembly Election 2026", "Assembly", LocalDate.of(2026, 5, 6), tn3);
        Election tnEl4 = createElection("TN-ASM-2026-004", "Tamil Nadu Assembly Election 2026", "Assembly", LocalDate.of(2026, 5, 6), tn4);
        Election tnEl5 = createElection("TN-ASM-2026-005", "Tamil Nadu Assembly Election 2026", "Assembly", LocalDate.of(2026, 5, 6), tn5);
        // KL
        Election klEl1 = createElection("KL-ASM-2026-001", "Kerala Assembly Election 2026", "Assembly", LocalDate.of(2026, 4, 20), kl1);
        // KA
        Election kaEl1 = createElection("KA-ASM-2026-001", "Karnataka Assembly Election 2026", "Assembly", LocalDate.of(2026, 3, 15), ka1);
        // AP
        Election apEl1 = createElection("AP-ASM-2026-001", "Andhra Pradesh Assembly Election 2026", "Assembly", LocalDate.of(2026, 6, 1), ap1);
        // TS
        Election tsEl1 = createElection("TS-ASM-2026-001", "Telangana Assembly Election 2026", "Assembly", LocalDate.of(2026, 2, 10), ts1);

        // Candidates
        // TN-ASM-2026-001
        Candidate can1 = createCandidate("CAN-DMK-001", "M.K. Stalin", 71, "B.A.", dmk, tnEl1);
        Candidate can2 = createCandidate("CAN-AIADMK-001", "Edappadi K. Palaniswami", 70, "B.Sc.", aiadmk, tnEl1);
        Candidate can3 = createCandidate("CAN-BJP-001", "K. Annamalai", 40, "MBA, IIM", bjp, tnEl1);
        Candidate can4 = createCandidate("CAN-INC-001", "K.S. Alagiri", 65, "M.A.", inc, tnEl1);
        
        // TN-ASM-2026-002
        Candidate can5 = createCandidate("CAN-DMK-002", "Udhayanidhi Stalin", 42, "B.Com", dmk, tnEl2);
        Candidate can6 = createCandidate("CAN-AIADMK-002", "O. Panneerselvam", 68, "B.A.", aiadmk, tnEl2);
        Candidate can7 = createCandidate("CAN-BJP-002", "Nainar Nagendran", 62, "B.L.", bjp, tnEl2);
        Candidate can8 = createCandidate("CAN-PMK-001", "Anbumani Ramadoss", 56, "MBBS, MD", pmk, tnEl2);

        // Seed Voters
        Voter voter1 = createVoter("VOT-TN-001", "Rajesh Kumar", LocalDate.of(1985, 4, 12), "Male", "9876543210", "12, G.N. Chetty Road, T.Nagar, Chennai", tn1);
        Voter voter2 = createVoter("VOT-TN-002", "Priya Sundaram", LocalDate.of(1990, 8, 24), "Female", "9876543211", "45, Anna Salai, Chennai", tn1);
        Voter voter3 = createVoter("VOT-TN-003", "Karthik Raja", LocalDate.of(1995, 11, 3), "Male", "9876543212", "78, Cathedral Road, Chennai", tn1);
        Voter voter4 = createVoter("VOT-TN-004", "Anitha Selvam", LocalDate.of(1988, 1, 15), "Female", "9876543213", "101, Luz Church Road, Mylapore, Chennai", tn2);
        Voter voter5 = createVoter("VOT-TN-005", "Sanjay Nair", LocalDate.of(1992, 5, 20), "Male", "9876543214", "23, Nelson Manickam Road, Chennai", tn2);
        Voter voter6 = createVoter("VOT-KL-001", "Faisal Khan", LocalDate.of(1980, 9, 30), "Male", "9876543215", "Flat 4B, Skyline Apartments, Kowdiar, TVM", kl1);
        Voter voter7 = createVoter("VOT-KA-001", "Ramesh Rao", LocalDate.of(1975, 2, 14), "Male", "9876543216", "56, 100 Feet Road, Indiranagar, Bangalore", ka1);
        Voter voter8 = createVoter("VOT-AP-001", "Lakshmi Prasanna", LocalDate.of(1983, 7, 22), "Female", "9876543217", "12-3, Beach Road, Vizag", ap1);
        Voter voter9 = createVoter("VOT-TS-001", "Srinivas Rao", LocalDate.of(1978, 12, 5), "Male", "9876543218", "89, Jubilee Hills, Hyderabad", ts1);

        // Seed Votes
        createVote("VOTE-1", voter1, can1, tnEl1, pollingStationRepository.findAll().get(0));
        createVote("VOTE-2", voter2, can1, tnEl1, pollingStationRepository.findAll().get(0));
        createVote("VOTE-3", voter3, can3, tnEl1, pollingStationRepository.findAll().get(1));
    }

    private Constituency createConstituency(String code, String name, String district, String state) {
        Constituency c = new Constituency();
        c.setConstituencyCode(code);
        c.setName(name);
        c.setDistrict(district);
        c.setState(state);
        return constituencyRepository.save(c);
    }

    private PollingStation createPollingStation(String code, String name, String location, Integer capacity, Constituency constituency) {
        PollingStation p = new PollingStation();
        p.setStationCode(code);
        p.setName(name);
        p.setLocation(location);
        p.setCapacity(capacity);
        p.setConstituency(constituency);
        return pollingStationRepository.save(p);
    }

    private Party createParty(String code, String name, String symbol) {
        Party p = new Party();
        p.setPartyCode(code);
        p.setName(name);
        p.setSymbol(symbol);
        return partyRepository.save(p);
    }

    private Election createElection(String code, String name, String type, LocalDate date, Constituency constituency) {
        Election e = new Election();
        e.setElectionCode(code);
        e.setName(name);
        e.setType(type);
        e.setElectionDate(date);
        e.setConstituency(constituency);
        return electionRepository.save(e);
    }

    private Candidate createCandidate(String code, String name, Integer age, String qual, Party party, Election election) {
        Candidate c = new Candidate();
        c.setCandidateCode(code);
        c.setName(name);
        c.setAge(age);
        c.setQualification(qual);
        c.setParty(party);
        c.setElection(election);
        return candidateRepository.save(c);
    }

    private Voter createVoter(String code, String name, LocalDate dob, String gender, String phone, String address, Constituency constituency) {
        Voter v = new Voter();
        v.setVoterCode(code);
        v.setName(name);
        v.setDob(dob);
        v.setGender(gender);
        v.setPhone(phone);
        v.setAddress(address);
        v.setConstituency(constituency);
        return voterRepository.save(v);
    }

    private Vote createVote(String number, Voter voter, Candidate candidate, Election election, PollingStation station) {
        Vote v = new Vote();
        v.setVoteNumber(number);
        v.setTimestamp(LocalDateTime.now());
        v.setVoter(voter);
        v.setCandidate(candidate);
        v.setElection(election);
        v.setPollingStation(station);
        return voteRepository.save(v);
    }
}
