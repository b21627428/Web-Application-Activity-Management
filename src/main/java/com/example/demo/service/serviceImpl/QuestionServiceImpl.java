package com.example.demo.service.serviceImpl;


import com.example.demo.model.Question;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Override
    public Set<Question> getQuestions(long parseLong) {
        return questionRepository.getQuestions(parseLong);
    }
}
