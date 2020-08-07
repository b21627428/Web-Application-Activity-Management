package com.example.demo.controller;

import com.example.demo.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0/statistic")
@CrossOrigin
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping("/activity")
    public ResponseEntity getActivityStatistics(@RequestParam Long id){
        return ResponseEntity.ok(statisticService.getActivityStatistics(id));
    }
}
