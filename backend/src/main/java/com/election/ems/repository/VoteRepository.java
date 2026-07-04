package com.election.ems.repository;

import com.election.ems.entity.Vote;
import com.election.ems.web.ResultRow;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    boolean existsByVoterIdAndElectionId(Long voterId, Long electionId);

    @Query("""
            select new com.election.ems.web.ResultRow(v.candidate.id, v.candidate.name, v.candidate.party.name, count(v))
            from Vote v
            where v.election.id = :electionId
            group by v.candidate.id, v.candidate.name, v.candidate.party.name
            order by count(v) desc, v.candidate.name asc
            """)
    List<ResultRow> findResultsByElectionId(@Param("electionId") Long electionId);
}
