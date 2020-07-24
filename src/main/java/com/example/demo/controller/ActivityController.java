package com.example.demo.controller;

import com.example.demo.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
    /*
    @GetMapping("/admin")
    public ResponseEntity listActivities(@RequestParam Integer page, @RequestParam Integer size, @RequestParam String sortBy, @RequestParam String search) {
        return ResponseEntity.ok(activityService.listActivities(page, size, sortBy, search));
    }*/



    /*
    @PostMapping
    public ResponseEntity createActivity(@Valid @RequestBody CreateActivityDTO createActivityDTO){
        try {
            activityService.createActivity(createActivityDTO);
            return ResponseEntity.ok("The activity created...");
        }
        catch (IllegalArgumentException i){
            return ResponseEntity.unprocessableEntity().body(i.getMessage());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.unprocessableEntity().body("Something went wrong...");
        }
    }
    @PutMapping
    public ResponseEntity updateActivity(@Valid @RequestBody UpdateActivityDTO updateActivityDTO){
        try{
            activityService.updateActivity(updateActivityDTO);
            return ResponseEntity.ok("The activity updated...");
        }catch (IllegalArgumentException i){
            return ResponseEntity.unprocessableEntity().body(i.getMessage());
        } catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("There is no activity");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteActivity(@PathVariable String id){
        try{
            activityService.deleteActivity(Long.parseLong(id));
            return ResponseEntity.ok("The activity deleted...");
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("There is no activity");
        }
    }


    @GetMapping("/{activityId}")
    public ResponseEntity getActivity(@PathVariable String activityId){
        try {
            return ResponseEntity.ok(activityService.getActivity(Long.parseLong(activityId)));
        }catch (Exception e){
            return ResponseEntity.unprocessableEntity().body("There is no activity");
        }
    }
}*/
