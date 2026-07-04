package com.election.ems.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "states")
public class State {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    @Column(nullable = false)
    private String code;
    
    @Column
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
