package com.example.demo.security;

import com.example.demo.model.Person;
import com.example.demo.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private PersonRepository personRepository;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<Person> user = personRepository.findByIdentificationNumber(s);
        if(s==null) throw new UsernameNotFoundException("invalid identification number or password");
        return new org.springframework.security.core.userdetails.User(user.get().getIdentificationNumber(),user.get().getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("ROLE_"+getUserAuthority(user.get()))));
    }
    public static String getUserAuthority(Person user){
        if(user.isAdmin()){
            return "ADMIN";
        }
        return "USER";
    }
}
