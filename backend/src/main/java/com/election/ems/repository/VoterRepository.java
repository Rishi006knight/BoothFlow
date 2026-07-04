package com.election.ems.repository;

import com.election.ems.entity.Voter;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoterRepository extends JpaRepository<Voter, Long> {
    List<Voter> findByConstituencyId(Long constituencyId);
}
