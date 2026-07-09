package com.election.ems.config;

import com.election.ems.entity.*;
import com.election.ems.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class UserModelListener extends AbstractMongoEventListener<Object> {

    private final SequenceGeneratorService sequenceGenerator;

    @Autowired
    public UserModelListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Object> event) {
        Object source = event.getSource();
        if (source instanceof State && ((State) source).getId() == null) {
            ((State) source).setId(sequenceGenerator.generateSequence(State.class.getSimpleName()));
        } else if (source instanceof Constituency && ((Constituency) source).getId() == null) {
            ((Constituency) source).setId(sequenceGenerator.generateSequence(Constituency.class.getSimpleName()));
        } else if (source instanceof Voter && ((Voter) source).getId() == null) {
            ((Voter) source).setId(sequenceGenerator.generateSequence(Voter.class.getSimpleName()));
        } else if (source instanceof Candidate && ((Candidate) source).getId() == null) {
            ((Candidate) source).setId(sequenceGenerator.generateSequence(Candidate.class.getSimpleName()));
        } else if (source instanceof Election && ((Election) source).getId() == null) {
            ((Election) source).setId(sequenceGenerator.generateSequence(Election.class.getSimpleName()));
        } else if (source instanceof Party && ((Party) source).getId() == null) {
            ((Party) source).setId(sequenceGenerator.generateSequence(Party.class.getSimpleName()));
        } else if (source instanceof PollingStation && ((PollingStation) source).getId() == null) {
            ((PollingStation) source).setId(sequenceGenerator.generateSequence(PollingStation.class.getSimpleName()));
        } else if (source instanceof Vote && ((Vote) source).getId() == null) {
            ((Vote) source).setId(sequenceGenerator.generateSequence(Vote.class.getSimpleName()));
        }
    }
}
