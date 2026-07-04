package com.election.ems.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CandidateRequest(
        @NotBlank String candidateCode,
        @NotBlank String name,
        @NotNull @Min(18) Integer age,
        @NotBlank String qualification,
        @NotNull Long partyId,
        @NotNull Long electionId
) {
}
