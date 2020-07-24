package com.example.demo.service;

import com.example.demo.model.Question;


import java.util.Set;

public interface QuestionService {

    Set<Question> getQuestions(long parseLong);
}
