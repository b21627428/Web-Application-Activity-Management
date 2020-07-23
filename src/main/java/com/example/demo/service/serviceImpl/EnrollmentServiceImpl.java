package com.example.demo.service.serviceImpl;


import com.example.demo.dto.QRCodeDTO;
import com.example.demo.dto.activity.ActivityDTO;
import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.dto.person.PersonDTO;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.EnrollmentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final PersonRepository personRepository;
    private final ActivityRepository activityRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final ModelMapper modelMapper;


    @Override
    public QRCodeDTO makeEnrollment(MakeEnrollmentRequest request) {
        Person person = isValidPerson(request.getIdentificationNumber());
        Activity activity = isValidActivity(request.getActivityId());
        isAlreadyEnroll(person.getId(),activity.getId(),"make");
        if(activity.getIsActive() == true){
            if(activity.getAskedQuestions().size() == request.getGivenAnswers().size()){
                if(enrollmentRepository.countByActivityId(activity.getId()) != activity.getQuota() ){

                    Enrollment enrollment = enrollmentRepository.save(new Enrollment(LocalDateTime.now(),new ArrayList<>()));
                    person.getEnrollments().add(enrollment);
                    personRepository.save(person);
                    activity.getEnrollments().add(enrollment);
                    activityRepository.save(activity);
                    for (String s : request.getGivenAnswers().keySet()) {

                        Answer answer = answerRepository.save(request.getGivenAnswers().get(s));

                        Question question = questionRepository.findById(Long.parseLong(s)).get();
                        question.getAnswers().add(answer);
                        questionRepository.save(question);

                        enrollment.getGivenAnswers().add(answer);

                    }
                    enrollmentRepository.save(enrollment);

                    ActivityDTO activityDTO = modelMapper.map(activity,ActivityDTO.class);
                    activityDTO.setActivityId(request.getActivityId());
                    return new QRCodeDTO(modelMapper.map(person, PersonDTO.class),activityDTO);
                }
                else throw new RuntimeException("The quota is full");
            }else throw new RuntimeException("All questions must be answered");
        }else throw new RuntimeException("The activity is not active");
    }


    @Override
    public void cancelEnrollment(CancelEnrollmentRequst request) {
        enrollmentRepository.delete(checkEnrollment(request));
    }

    @Override
    public Enrollment checkEnrollment(CancelEnrollmentRequst request){
        return isAlreadyEnroll(isValidPerson(request.getIdentificationNumber()).getId(),isValidActivity(request.getActivityId()).getId(),"cancel");
    }

    @Override
    public QRCodeDTO getQrCodeDTO(String identificationNumber, Long activityId) {
        return new QRCodeDTO(modelMapper.map(isValidPerson(identificationNumber),PersonDTO.class),modelMapper.map(isValidActivity(activityId),ActivityDTO.class));
    }

    private Enrollment isAlreadyEnroll(Long personId, Long activityId,String makeOrCancel) {
        if(makeOrCancel.equals("cancel")){
            return enrollmentRepository.findByActivityIdAndPersonId(personId,activityId).orElseThrow(() ->new RuntimeException("The user is no enrolled"));
        }
        else if (makeOrCancel.equals("make")){
            if(enrollmentRepository.findByActivityIdAndPersonId(personId,activityId).isPresent())  throw new RuntimeException("The user is already enrolled");
        }
        return null;
    }
    private Person isValidPerson(String identificationNumber){
        return personRepository.findByIdentificationNumber(identificationNumber).orElseThrow(()->new RuntimeException("There is no user"));
    }
    private Activity isValidActivity(Long activityId){
        return activityRepository.findById(activityId).orElseThrow(() -> new RuntimeException("There is no activity"));
    }


}
