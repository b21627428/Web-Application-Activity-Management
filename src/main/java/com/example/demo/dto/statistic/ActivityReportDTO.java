package com.example.demo.dto.statistic;

import com.example.demo.dto.person.PersonDTO;
import lombok.Data;

import java.util.LinkedHashMap;
import java.util.List;

@Data
public class ActivityReportDTO {

    List<PersonDTO> enrolledPeople;
    LinkedHashMap<String,Long> enrollmentCountByDayOfWeek;

}
