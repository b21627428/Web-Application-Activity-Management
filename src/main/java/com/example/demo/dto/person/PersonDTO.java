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

    public PersonDTO(String identificationNumber,String email,String name,String address,String phone){
        this.identificationNumber = identificationNumber;
        this.email = email;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}
