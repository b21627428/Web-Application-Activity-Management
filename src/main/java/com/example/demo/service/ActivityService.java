package com.example.demo.service;


import com.example.demo.dto.activity.ActivityDTO;
import com.example.demo.dto.activity.CreateActivityDTO;
import com.example.demo.dto.activity.ImageDTO;
import com.example.demo.dto.activity.UpdateActivityDTO;
import com.example.demo.model.Activity;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface ActivityService {

    Page<ActivityDTO> listActivitiesAfterNow(Integer page , Integer size, String sortBy, String search);

    Page<Activity> listActivities(Integer page , Integer size, String sortBy, String search);

    void createActivity(CreateActivityDTO createActivityDTO);

    UpdateActivityDTO updateActivity(UpdateActivityDTO updateActivityDTO);

    void deleteActivity(long parseLong);

    void changeActive(long parseLong,Boolean did);

    void updateImage(ImageDTO imageDTO);

    /*
    void createActivity(CreateActivityDTO createActivityDTO);

    void deleteActivity(long parseLong);

    void updateActivity(UpdateActivityDTO updateActivityDTO);



    Activity getActivity(Long id);*/
}
