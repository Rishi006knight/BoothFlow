package com.election.ems.web;

import java.util.List;

public record DashboardResponse(
        long constituencies,
        long pollingStations,
        long voters,
        long parties,
        long elections,
        long candidates,
        long votes,
        List<ResultCard> latestResults
) {
    public record ResultCard(Long electionId, String electionName, String leadingCandidate, String partyName, Long voteCount) {
    }
}
