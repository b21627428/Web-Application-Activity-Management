package com.example.demo.service;

import com.example.demo.dto.question.AddQuestionDTO;
import com.example.demo.dto.question.UpdateQuestionDTO;
import com.example.demo.model.Question;


import java.util.Set;

public interface QuestionService {

    Set<Question> getQuestions(long parseLong);

    void addQuestion(AddQuestionDTO addQuestionDTO);

    void deleteQuestion(Long id);
}
