package com.election.ems.web;

public record ResultRow(Long candidateId, String candidateName, String partyName, Long voteCount) {
}
