package com.example.demo.dto.activity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ActivityDTO {

    private Long activityId;
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer quota;
    private String pictureUrl;
    private Boolean isActive;
    private String address;
    private String explanation;
    private Double lat;
    private Double lng;
}
