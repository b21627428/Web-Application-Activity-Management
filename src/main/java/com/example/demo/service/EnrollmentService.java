package com.example.demo.service;


import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.model.Enrollment;

public interface EnrollmentService {

    void makeEnrollment(MakeEnrollmentRequest request);

    void cancelEnrollment(CancelEnrollmentRequst request);

    Enrollment checkEnrollment(CancelEnrollmentRequst request);

}
