package com.example.demo.controller;


import com.example.demo.dto.person.LoginRequest;
import com.example.demo.dto.person.RegisterRequest;
import com.example.demo.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0/users")
@CrossOrigin
@RequiredArgsConstructor
public class PersonController {


    private final PersonService personService;
    private final ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity createUser(@Valid @RequestBody RegisterRequest registerRequest){
        try{
            personService.register(registerRequest) ;
            return ResponseEntity.ok("The user created");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Something went wrong...");
        }

    }
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequest loginRequest)  {
        try{
            return ResponseEntity.ok(personService.login(loginRequest));
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("Identification number or password wrong");
        }
    }
}
