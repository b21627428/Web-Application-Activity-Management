package com.example.demo.repository;


import com.example.demo.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface QuestionRepository  extends JpaRepository<Question,Long> {

     @Query("SELECT q FROM Activity a JOIN a.askedQuestions q WHERE a.id = ?1")
     Set<Question> getQuestions(long parseLong);

}
