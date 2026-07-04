package com.election.ems.web.dto;

import jakarta.validation.constraints.NotBlank;

public record ConstituencyRequest(
        @NotBlank String constituencyCode,
        @NotBlank String name,
        @NotBlank String district,
        @NotBlank String state
) {
}
