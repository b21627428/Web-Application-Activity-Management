package com.example.demo.dto.person;


import javax.validation.constraints.Email;


public class PersonDTO {

    private String identificationNumber;

    @Email
    private String email;

    private String name;

    private String address;

    private String phone;

    public PersonDTO(){

    }
    public PersonDTO(String identificationNumber,String email,String name,String address,String phone){
        this.identificationNumber = identificationNumber;
        this.email = email;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
                "identificationNumber='" + identificationNumber + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
