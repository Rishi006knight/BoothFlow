package com.election.ems.repository;

import com.election.ems.entity.Candidate;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends MongoRepository<Candidate, Long> {

    @Query("{ 'election.$id' : ?0 }")
    List<Candidate> findByElectionId(Long electionId);
}
