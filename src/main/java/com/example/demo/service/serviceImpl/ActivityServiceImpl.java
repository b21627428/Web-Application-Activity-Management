package com.example.demo.service.serviceImpl;

import com.example.demo.dto.activity.ActivityDTO;
import com.example.demo.dto.activity.CreateActivityDTO;
import com.example.demo.dto.activity.ImageDTO;
import com.example.demo.dto.activity.UpdateActivityDTO;
import com.example.demo.model.Activity;
import com.example.demo.repository.ActivityRepository;
import com.example.demo.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<ActivityDTO> listActivitiesAfterNow(Integer page, Integer size, String sortBy, String search) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        if (search == null || search.trim().equals(""))
            return activityRepository.getActivities(LocalDateTime.now(), pageRequest);
        else return activityRepository.getActivities(LocalDateTime.now(), search.trim().toLowerCase(), pageRequest);
    }

    @Override
    public Page<Activity> listActivities(Integer page, Integer size, String sortBy, String search) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        if (search == null || search.trim().equals("")) return activityRepository.getActivities(pageRequest);
        else return activityRepository.getActivities(search.trim().toLowerCase(), pageRequest);
    }

    @Override
    public void createActivity(CreateActivityDTO createActivityDTO) {
        createActivityDTO.setIsActive(false);
        activityRepository.save(modelMapper.map(createActivityDTO,Activity.class));
    }

    @Override
    public UpdateActivityDTO updateActivity(UpdateActivityDTO updateActivityDTO) {
        Activity old = activityRepository.findById(updateActivityDTO.getId()).get();
        if(old.getStartDate().isBefore(LocalDateTime.now())) throw new RuntimeException("The activity in the past can not update");
        modelMapper.map(updateActivityDTO,old);
        return modelMapper.map(activityRepository.save(old),UpdateActivityDTO.class);
    }

    @Override
    public void deleteActivity(long parseLong) {
        Activity old = activityRepository.findById(parseLong).get();
        if(old.getStartDate().isBefore(LocalDateTime.now())) throw new RuntimeException("The activity in the past can not delete");
        activityRepository.deleteById(parseLong);
    }

    @Override
    public void changeActive(long parseLong,Boolean did) {
        Activity old = activityRepository.findById(parseLong).get();
        if(old.getStartDate().isBefore(LocalDateTime.now())) throw new RuntimeException("The activity in the past can not active");
        old.setIsActive(did);
        activityRepository.save(old);
    }

    @Override
    public void updateImage(ImageDTO imageDTO) {
        Activity old = activityRepository.findById(imageDTO.getId()).get();
        old.setPictureUrl(imageDTO.getPictureUrl());
        activityRepository.save(old);
    }
}
