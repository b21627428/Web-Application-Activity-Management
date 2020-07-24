package com.example.demo.service;


import com.example.demo.dto.QRCodeDTO;
import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.model.Enrollment;

import java.util.HashMap;

public interface EnrollmentService {

    HashMap<String,String> makeEnrollment(MakeEnrollmentRequest request);

    void cancelEnrollment(CancelEnrollmentRequst request);

    Enrollment checkEnrollment(CancelEnrollmentRequst request);

    QRCodeDTO getQrCodeDTO(String identificationNumber, Long activityId);
}
