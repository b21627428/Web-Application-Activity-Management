package com.example.demo.dto.enrollment;

import com.example.demo.model.Answer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashMap;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MakeEnrollmentRequest extends CancelEnrollmentRequst {


    private HashMap<String,Answer> givenAnswers;

}
