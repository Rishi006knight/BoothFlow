package com.election.ems.repository;

import com.election.ems.entity.Election;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionRepository extends MongoRepository<Election, Long> {
}
