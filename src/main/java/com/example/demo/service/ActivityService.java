package com.example.demo.service;


import com.example.demo.dto.activity.ActivityDTO;
import org.springframework.data.domain.Page;

public interface ActivityService {

    Page<ActivityDTO> listActivitiesAfterNow(Integer page , Integer size, String sortBy, String search);

    //Page<ActivityDTO> listActivities(Integer page ,Integer size,String sortBy,String search);

    /*
    void createActivity(CreateActivityDTO createActivityDTO);

    void deleteActivity(long parseLong);

    void updateActivity(UpdateActivityDTO updateActivityDTO);



    Activity getActivity(Long id);*/
}
