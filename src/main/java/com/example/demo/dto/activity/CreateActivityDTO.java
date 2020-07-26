package com.example.demo.dto.activity;

import com.example.demo.model.Enrollment;
import com.example.demo.model.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateActivityDTO {

    @NotEmpty
    private String name;
    @NotEmpty
    private String address;
    @NotNull
    private LocalDateTime startDate;
    @NotNull
    private LocalDateTime endDate;
    @NotNull
    private Integer quota;
    private String pictureUrl;
    private Boolean isActive;
    private String explanation;
    @NotNull
    private Double lat;
    @NotNull
    private Double lng;

    @AssertTrue
    public boolean isStartDateBeforeEndDate(){
        return (startDate != null && endDate != null) ? startDate.isBefore(endDate) : false;
    }
}
