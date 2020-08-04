package com.example.demo.controller;

import com.example.demo.dto.activity.CreateActivityDTO;
import com.example.demo.dto.activity.ImageDTO;
import com.example.demo.dto.activity.UpdateActivityDTO;
import com.example.demo.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0/activities")
@CrossOrigin
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping("/user")
    public ResponseEntity listActivitiesAfterNow(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String search) {
        return ResponseEntity.ok(activityService.listActivitiesAfterNow(page, size, sortBy, search));
    }

    @GetMapping("/admin")
    public ResponseEntity listActivities(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String search) {
        return ResponseEntity.ok(activityService.listActivities(page, size, sortBy, search));
    }


    @PostMapping
    public ResponseEntity createActivity(@Valid @RequestBody CreateActivityDTO createActivityDTO){
        activityService.createActivity(createActivityDTO);
        return ResponseEntity.ok("Succesfully created");

    }
    @PutMapping
    public ResponseEntity updateActivity(@Valid @RequestBody UpdateActivityDTO updateActivityDTO){
        return ResponseEntity.ok(activityService.updateActivity(updateActivityDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteActivity(@PathVariable String id){
        activityService.deleteActivity(Long.parseLong(id));
        return ResponseEntity.ok("The activity deleted...");
    }
    @GetMapping("/change")
    public ResponseEntity changeActive(@RequestParam Long id, @RequestParam Boolean did){
        activityService.changeActive(id,did);
        return ResponseEntity.ok("The activity is active..");
    }


}
