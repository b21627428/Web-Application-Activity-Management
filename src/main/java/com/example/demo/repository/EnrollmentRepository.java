package com.example.demo.repository;

import com.example.demo.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {


    @Query("SELECT e2 FROM Activity a JOIN a.enrollments e2 WHERE e2 IN (SELECT e1 FROM Person p JOIN p.enrollments e1 WHERE p.id = :personId) AND a.id = :activityId")
    Optional<Enrollment> findByActivityIdAndPersonId(Long personId, Long activityId);


    @Query("SELECT count(e) FROM Activity a JOIN a.enrollments e WHERE a.id = ?1 ")
    Integer countByActivityId(Long activityId);

}
