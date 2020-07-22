package com.example.demo.dto.enrollment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@MappedSuperclass
public class CancelEnrollmentRequst {

    @NotNull
    private String identificationNumber;
    @NotNull
    private Long activityId;
}
