package com.example.demo.controller;


import com.example.demo.EmailService;
import com.example.demo.QrCodeGenerator;
import com.example.demo.dto.QRCodeDTO;
import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.service.EnrollmentService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

import java.io.IOException;


@RestController
@RequestMapping("/api/1.0/enrollments")
@CrossOrigin
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final EmailService emailService;
    private final QrCodeGenerator qrCodeGenerator;

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
    public void makeEnrollment(@Valid @RequestBody MakeEnrollmentRequest request) throws IOException, WriterException, MessagingException {
        emailService.send(enrollmentService.makeEnrollment(request));

    }

    @GetMapping("/qrcode")
    public String getQrCode(@RequestParam String identificationNumber, @RequestParam Long activityId) throws IOException, WriterException {
        return qrCodeGenerator.create(enrollmentService.getQrCodeDTO(identificationNumber,activityId).toString());
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
