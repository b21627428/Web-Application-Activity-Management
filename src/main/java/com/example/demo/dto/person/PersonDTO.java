package com.example.demo.dto.person;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@ToString
public class PersonDTO {

    private String identificationNumber;

    @Email
    private String email;

    private String name;

    private String address;

    private String phone;
}
