package com.example.demo.dto.enrollment;

import com.example.demo.model.Answer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MakeEnrollmentRequest extends CancelEnrollmentRequst {


    private HashMap<String,Answer> givenAnswers;

}
