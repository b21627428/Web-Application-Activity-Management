package com.example.demo.service.serviceImpl;


import com.example.demo.dto.enrollment.CancelEnrollmentRequst;
import com.example.demo.dto.enrollment.MakeEnrollmentRequest;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final PersonRepository personRepository;
    private final ActivityRepository activityRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;


    @Override
    public void makeEnrollment(MakeEnrollmentRequest request) {
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
                        System.out.println(answer);

                        enrollment.getGivenAnswers().add(answer);
                        System.out.println(enrollment);

                    }
                    enrollmentRepository.save(enrollment);

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
