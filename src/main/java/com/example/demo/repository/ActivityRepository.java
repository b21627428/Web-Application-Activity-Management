package com.example.demo.repository;

import com.example.demo.dto.activity.ActivityDTO;
import com.example.demo.dto.person.PersonDTO;
import com.example.demo.model.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;


public interface ActivityRepository extends JpaRepository<Activity,Long> {

    @Query("SELECT new com.example.demo.dto.activity.ActivityDTO(a.id,a.name,a.startDate,a.endDate,a.quota,a.pictureUrl,a.isActive,a.address,a.explanation,a.lat,a.lng) " +
            "FROM Activity a WHERE a.startDate > ?1 ")
    Page<ActivityDTO> getActivities(LocalDateTime now, PageRequest pageRequest);

    @Query("SELECT new com.example.demo.dto.activity.ActivityDTO(a.id,a.name,a.startDate,a.endDate,a.quota,a.pictureUrl,a.isActive,a.address,a.explanation,a.lat,a.lng) " +
            "FROM Activity a WHERE a.startDate > ?1 AND lower(a.name) LIKE %?2%")
    Page<ActivityDTO> getActivities(LocalDateTime now, String search,PageRequest pageRequest);


    @Query("SELECT a " +
            "FROM Activity a ")
    Page<Activity> getActivities(PageRequest pageRequest);

    @Query("SELECT a " +
            "FROM Activity a WHERE lower(a.name) LIKE %?1%")
    Page<Activity> getActivities(String search,PageRequest pageRequest);

    @Query("SELECT new com.example.demo.dto.person.PersonDTO(p.identificationNumber,p.email,p.name,p.address,p.phone) FROM Person p JOIN p.enrollments e1 WHERE e1 IN (SELECT e2 FROM Activity a JOIN a.enrollments e2 WHERE a.id = :id)")
    List<PersonDTO> getPeople(Long id);

    @Query("SELECT e.dayOfWeek,count(e) FROM Activity a JOIN a.enrollments e WHERE a.id = :id group by (e.dayOfWeek)")
    List<String> getDayOfWeek(Long id);
}
