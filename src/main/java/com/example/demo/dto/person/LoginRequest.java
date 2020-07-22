package com.example.demo.dto.person;

import com.example.demo.annotation.IdentificationNumber;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class LoginRequest {

    @IdentificationNumber
    private String identificationNumber;

    @NotEmpty
    private String password;

}
