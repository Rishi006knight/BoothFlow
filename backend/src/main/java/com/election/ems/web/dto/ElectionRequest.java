package com.election.ems.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record ElectionRequest(
        @NotBlank String electionCode,
        @NotBlank String name,
        @NotBlank String type,
        @NotNull LocalDate electionDate,
        @NotNull Long constituencyId
) {
}
