package com.election.ems.repository;

import com.election.ems.entity.Vote;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends MongoRepository<Vote, Long> {

    @Query("{ 'voter.$id' : ?0, 'election.$id' : ?1 }")
    List<Vote> findByVoterIdAndElectionId(Long voterId, Long electionId);

    @Query("{ 'election.$id' : ?0 }")
    List<Vote> findByElectionId(Long electionId);
}
