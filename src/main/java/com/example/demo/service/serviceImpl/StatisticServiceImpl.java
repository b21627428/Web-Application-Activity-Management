package com.example.demo.service.serviceImpl;

import com.example.demo.dto.person.PersonDTO;
import com.example.demo.dto.statistic.ActivityReportDTO;
import com.example.demo.repository.ActivityRepository;
import com.example.demo.service.StatisticService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StatisticServiceImpl implements StatisticService {

    private final ActivityRepository activityRepository;

    public StatisticServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public ActivityReportDTO getActivityStatistics(Long id) {
        ActivityReportDTO dto = new ActivityReportDTO();
        dto.setEnrolledPeople(activityRepository.getPeople(id));
        dto.setEnrollmentCountByDayOfWeek(getDayOfWeek(id));
        return dto;

    }
    private LinkedHashMap<String,Long> getDayOfWeek(Long id){
        LinkedHashMap<String,Long> lmap = new LinkedHashMap<String,Long>();
        Arrays.asList("Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday").forEach(s -> lmap.put(s,0L));
        Set<String> keySet = lmap.keySet();
        List<String> listKeys = new ArrayList<String>(keySet);

        for (String s : activityRepository.getDayOfWeek(id)) {
            lmap.put(listKeys.get(Integer.parseInt(s.split(",")[0])-1),Long.parseLong(String.valueOf(s.split(",")[1])));
        }
        return lmap;
    }
}
