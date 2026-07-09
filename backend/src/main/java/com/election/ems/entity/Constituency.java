package com.election.ems.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "constituencies")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Constituency {

    @Id
    private Long id;

    private String constituencyCode;

    private String name;

    private String district;

    private String state;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConstituencyCode() {
        return constituencyCode;
    }

    public void setConstituencyCode(String constituencyCode) {
        this.constituencyCode = constituencyCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
