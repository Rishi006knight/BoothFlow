package com.election.ems.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record VoterRequest(
        @NotBlank String voterCode,
        @NotBlank String name,
        @NotNull LocalDate dob,
        @NotBlank String gender,
        @NotBlank String phone,
        @NotBlank String address,
        @NotNull Long constituencyId
) {
}
