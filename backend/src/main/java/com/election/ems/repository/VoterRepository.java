package com.election.ems.repository;

import com.election.ems.entity.Voter;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VoterRepository extends MongoRepository<Voter, Long> {

    @Query("{ 'constituency.$id' : ?0 }")
    List<Voter> findByConstituencyId(Long constituencyId);
}
