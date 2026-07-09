package com.election.ems.repository;

import com.election.ems.entity.Party;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRepository extends MongoRepository<Party, Long> {
}
