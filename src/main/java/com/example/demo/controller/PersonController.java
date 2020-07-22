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
    /*
    @DeleteMapping("/{identificationNumber}")
    public ResponseEntity removePerson(@PathVariable String identificationNumber){
        try{
            personService.deletePerson(identificationNumber);
            return ResponseEntity.ok("The user deleted");
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("Identification number wrong");
        }
    }
    @GetMapping("/{identificationNumber}")
    public ResponseEntity getPerson(@PathVariable String identificationNumber){
        try{
            return ResponseEntity.ok(modelMapper.map(personService.getPerson(identificationNumber), GetPersonResponse.class));
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("There is no user");
        }
    }
    /*
    @PutMapping
    public ResponseEntity updatePerson(@Valid @RequestBody UpdateRequest updateRequest){
        try{
            personService.updatePerson(updateRequest);
            return ResponseEntity.ok("The user updated...");
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("There is no user");
        }
    }*/



}
