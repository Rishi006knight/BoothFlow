package com.election.ems.web.dto;

import jakarta.validation.constraints.NotBlank;

public record PartyRequest(
        @NotBlank String partyCode,
        @NotBlank String name,
        @NotBlank String symbol
) {
}
