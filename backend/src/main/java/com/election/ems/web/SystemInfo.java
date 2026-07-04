package com.election.ems.web;

public record SystemInfo(
    String version,
    String releaseDate,
    String springBootVersion,
    String javaVersion,
    String description
) {
    public SystemInfo() {
        this("1.0.0", "2026", "3.3.5", "17", "Election Management System - Comprehensive platform for managing electoral processes");
    }
}
