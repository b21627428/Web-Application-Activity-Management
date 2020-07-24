package com.example.demo.service.serviceImpl;


import com.example.demo.dto.person.LoginRequest;
import com.example.demo.dto.person.RegisterRequest;
import com.example.demo.model.Person;
import com.example.demo.repository.PersonRepository;
import com.example.demo.security.JwtTokenUtil;
import com.example.demo.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;


@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;


    @Override
    public void register(RegisterRequest registerRequest){

        Person person = modelMapper.map(registerRequest,Person.class);
        person.setAdmin(false);
        person.setEnrollments(Set.of());
        person.setPassword(bCryptPasswordEncoder.encode(person.getPassword()));
        personRepository.save(person);
    }

    @Override
    public String login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getIdentificationNumber(), loginRequest.getPassword()
                )
        );
        return jwtTokenUtil.generateToken(getPerson(loginRequest.getIdentificationNumber()));
    }


    @Override
    public Person getPerson(String identificationNumber) {
        return  personRepository.findByIdentificationNumber(identificationNumber).orElseThrow(RuntimeException::new);
    }

}
