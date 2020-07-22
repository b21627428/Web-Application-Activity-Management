package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.Set;


@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Question extends BaseEntity{

    private String text;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "question_id")
    private Set<Answer> answers;
}

