package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Answer extends BaseEntity{

    private String answerText;
}
