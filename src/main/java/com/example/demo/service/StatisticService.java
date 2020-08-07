package com.example.demo.service;

import com.example.demo.dto.person.PersonDTO;
import com.example.demo.dto.statistic.ActivityReportDTO;

import java.util.List;

public interface StatisticService {

    ActivityReportDTO getActivityStatistics(Long id);
}
