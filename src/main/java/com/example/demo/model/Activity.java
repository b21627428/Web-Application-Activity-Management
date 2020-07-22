package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Data
public class Activity extends BaseEntity{

    private String name;
    private String address;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer quota;
    private String pictureUrl;
    private Boolean isActive;
    private String explanation;
    private Double lat;
    private Double lng;

    @OneToMany
    @JoinColumn(name = "activity_id")
    private Set<Enrollment> enrollments;


    @OneToMany
    @JoinColumn(name = "activity_id")
    private Set<Question> askedQuestions;
}
