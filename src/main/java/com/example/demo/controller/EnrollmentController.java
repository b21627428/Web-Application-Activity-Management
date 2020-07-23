package com.example.demo.controller;


import com.example.demo.QrCodeGenerator;
import com.example.demo.dto.ImageDTO;
import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.service.EnrollmentService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;


@RestController
@RequestMapping("/api/1.0/enrollments")
@CrossOrigin
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
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
    public ResponseEntity<Object> makeEnrollment(@Valid @RequestBody MakeEnrollmentRequest request) throws IOException, WriterException {

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(qrCodeGenerator.writeQRCode(enrollmentService.makeEnrollment(request)));
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
