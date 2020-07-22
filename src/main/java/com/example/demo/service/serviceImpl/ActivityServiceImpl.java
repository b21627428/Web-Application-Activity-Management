package com.example.demo.service.serviceImpl;

import com.example.demo.dto.activity.ActivityDTO;
import com.example.demo.repository.ActivityRepository;
import com.example.demo.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;

    @Override
    public Page<ActivityDTO> listActivitiesAfterNow(Integer page, Integer size, String sortBy, String search) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        if (search == null || search.trim().equals(""))
            return activityRepository.getActivities(LocalDateTime.now(), pageRequest);
        else return activityRepository.getActivities(LocalDateTime.now(), search.trim().toLowerCase(), pageRequest);
    }
/*
    @Override
    public Page<ActivityDTO> listActivities(Integer page, Integer size, String sortBy, String search) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        if (search == null || search.trim().equals("")) return activityRepository.getActivities(pageRequest);
        else return activityRepository.getActivities(search.trim().toLowerCase(), pageRequest);
    }*/
}
    /*
    @Override
    public void createActivity(CreateActivityDTO createActivityDTO) {
        Activity activity = modelMapper.map(createActivityDTO,Activity.class);
        activity.setIsActive(false);
        //changeDate(activity.getStartDate());
        isValidDate(createActivityDTO.getStartDate(),"The startDate must be in the future");
        activityRepository.save(activity);
    }

    @Override
    public void deleteActivity(long parseLong) {
        Activity activity = getActivity(parseLong);
        //changeDate(activity.getStartDate());
        isValidDate(activity.getStartDate(),"The activity date already up so can not be delete");
        activityRepository.delete(activity);
    }

    @Override
    public void updateActivity(UpdateActivityDTO updateActivityDTO) {
        Activity activity = getActivity(updateActivityDTO.getActivityId());
        isValidDate(activity.getStartDate(),"The activity date already up so can not be update");
        //changeDate(updateActivityDTO.getStartDate());
        isValidDate(updateActivityDTO.getStartDate(),"The startDate must be in the future");
        modelMapper.map(updateActivityDTO,activity);
        activityRepository.save(activity);
    }

    @Override
    public void addQuestion(AddQuestionDTO addQuestionDTO) {
        Activity activity = getActivity(addQuestionDTO.getActivityId());
        isValidDate(activity.getStartDate(),"The activity date already up so can not be add");
        Question question = new Question(null,addQuestionDTO.getText(),activity,null);
        questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(long parseLong) {
        Question question = getQuestion(parseLong);
        Activity activity = getActivity(question.getBelongsToActivity().getActivityId());
        isValidDate(activity.getStartDate(),"The activity date already up so can not be delete");
        questionRepository.delete(question);
    }

    @Override
    public void updateQuestion(UpdateQuestionDTO updateQuestionDTO) {
        Question question = getQuestion(updateQuestionDTO.getQuestionId());
        Activity activity = getActivity(updateQuestionDTO.getActivityId());
        isValidDate(activity.getStartDate(),"The activity date already up so can not be update");
        modelMapper.map(updateQuestionDTO,question);
        questionRepository.save(question);
    }

    @Override
    public Activity getActivity(Long activityId){
        LocalDateTime now = LocalDateTime.now();

        System.out.println(now);
        return activityRepository.findById(activityId).orElseThrow(RuntimeException::new);
    }




    private Question getQuestion(Long questionId){
        return questionRepository.findById(questionId).orElseThrow(RuntimeException::new);
    }
    private void isValidDate(LocalDateTime date, String message){
        LocalDateTime now = LocalDateTime.now();
        if(date.isBefore(now)) throw new IllegalArgumentException(message);
    }
    /*private void changeDate(Date date){
        date.setHours(date.getHours()-3);
    }
}*/