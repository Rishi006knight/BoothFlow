package com.election.ems.web.dto;

import jakarta.validation.constraints.NotNull;

public record CastVoteRequest(
        @NotNull Long voterId,
        @NotNull Long candidateId,
        @NotNull Long electionId,
        @NotNull Long pollingStationId
) {
}
