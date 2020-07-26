package com.example.demo.dto.question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddQuestionDTO {

    private Long activityId;
    private String text;
}
