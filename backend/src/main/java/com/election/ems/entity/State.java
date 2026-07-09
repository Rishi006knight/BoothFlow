package com.election.ems.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "states")
public class State {
    
    @Id
    private Long id;
    
    private String name;
    
    private String code;
    
    private Integer electoralVotes;
    
    public State() {}
    
    public State(String name, String code, Integer electoralVotes) {
        this.name = name;
        this.code = code;
        this.electoralVotes = electoralVotes;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public Integer getElectoralVotes() {
        return electoralVotes;
    }
    
    public void setElectoralVotes(Integer electoralVotes) {
        this.electoralVotes = electoralVotes;
    }
}
