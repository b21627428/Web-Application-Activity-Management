package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Data
public class Person extends BaseEntity{


    private String identificationNumber;
    private String email;
    private String password;
    private String name;
    private String address;
    private String phone;
    private boolean isAdmin;
    private String pictureUrl;

    @OneToMany
    @JoinColumn(name = "person_id")
    private Set<Enrollment> enrollments;
}
