package com.example.demo.controller;


import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.service.EnrollmentService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0/enrollments")
@CrossOrigin
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @GetMapping
    public ResponseEntity checkEnrollment(@RequestParam String identificationNumber, @RequestParam Long activityId){
        try{
            enrollmentService.checkEnrollment(new CancelEnrollmentRequst(identificationNumber,activityId));
            return ResponseEntity.ok(true);
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity makeEnrollment(@Valid @RequestBody MakeEnrollmentRequest request){

            enrollmentService.makeEnrollment(request);
            return ResponseEntity.ok("Sucessfully enrolled.");

    }


    @DeleteMapping
    public ResponseEntity cancelEnrollment(@RequestParam String identificationNumber,@RequestParam Long activityId){
        try{
            enrollmentService.cancelEnrollment(new CancelEnrollmentRequst(identificationNumber,activityId));
            return ResponseEntity.ok("Sucessfully cancelled..");
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }
}
