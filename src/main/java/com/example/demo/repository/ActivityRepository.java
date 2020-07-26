package com.example.demo.repository;

import com.example.demo.dto.activity.ActivityDTO;
import com.example.demo.model.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDateTime;


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




}
