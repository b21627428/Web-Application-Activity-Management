package com.example.demo.controller;


import com.example.demo.dto.question.AddQuestionDTO;
import com.example.demo.dto.question.UpdateQuestionDTO;
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
    @PostMapping
    public ResponseEntity addQuestion(@RequestBody AddQuestionDTO addQuestionDTO){
        questionService.addQuestion(addQuestionDTO);
        return ResponseEntity.ok("The question added.");
    }
    @DeleteMapping
    public ResponseEntity deleteQuestion(@RequestParam Long id){
        questionService.deleteQuestion(id);
        return ResponseEntity.ok("The question deleted.");
    }
}
