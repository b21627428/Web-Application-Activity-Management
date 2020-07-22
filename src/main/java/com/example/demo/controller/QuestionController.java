package com.example.demo.controller;


import com.example.demo.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/1.0/questions")
@CrossOrigin
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam String activityId){
        try{
            return ResponseEntity.ok(questionService.getQuestions(Long.parseLong(activityId)));
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("There is no activity");
        }
    }
}
