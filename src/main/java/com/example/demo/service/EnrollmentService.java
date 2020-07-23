package com.example.demo.service;


import com.example.demo.dto.QRCodeDTO;
import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.model.Enrollment;

public interface EnrollmentService {

    QRCodeDTO makeEnrollment(MakeEnrollmentRequest request);

    void cancelEnrollment(CancelEnrollmentRequst request);

    Enrollment checkEnrollment(CancelEnrollmentRequst request);

    QRCodeDTO getQrCodeDTO(String identificationNumber, Long activityId);
}
