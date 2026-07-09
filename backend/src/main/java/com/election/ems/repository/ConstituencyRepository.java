package com.election.ems.repository;

import com.election.ems.entity.Constituency;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConstituencyRepository extends MongoRepository<Constituency, Long> {
}
