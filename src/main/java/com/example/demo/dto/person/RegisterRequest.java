package com.example.demo.dto.person;

import com.example.demo.annotation.IdentificationNumber;
import com.example.demo.annotation.UniqueUser;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class RegisterRequest {

    @IdentificationNumber
    @UniqueUser
    private String identificationNumber;

    @Email
    private String email;

    @NotEmpty(message = "The password must be filled")
    private String password;

    @NotEmpty(message = "The name must be filled")
    private String name;

    @NotEmpty(message = "The address must be filled")
    private String address;

    @NotEmpty(message = "The phone must be filled")
    private String phone;
}
