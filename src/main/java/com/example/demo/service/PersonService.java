package com.example.demo.service;

import com.example.demo.dto.person.LoginRequest;
import com.example.demo.dto.person.RegisterRequest;
import com.example.demo.model.Person;

public interface PersonService {

    void register(RegisterRequest registerRequest);

    String login(LoginRequest loginRequest);

    Person getPerson(String identificationNumber);


}
