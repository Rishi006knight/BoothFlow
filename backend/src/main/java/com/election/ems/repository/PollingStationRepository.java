package com.election.ems.repository;

import com.election.ems.entity.PollingStation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollingStationRepository extends MongoRepository<PollingStation, Long> {
}
