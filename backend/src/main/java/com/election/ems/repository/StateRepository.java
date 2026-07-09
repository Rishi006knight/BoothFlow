package com.election.ems.repository;

import com.election.ems.entity.State;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StateRepository extends MongoRepository<State, Long> {
    
    Optional<State> findByCode(String code);
    
    boolean existsByCode(String code);
}
