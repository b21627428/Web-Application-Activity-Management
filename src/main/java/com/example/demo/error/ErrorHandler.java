package com.example.demo.error;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
@RestController
public class ErrorHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ValidationError handleValidationException(MethodArgumentNotValidException exception, WebRequest request){
        ValidationError apiError = new ValidationError(400,"Validation Error",request.getDescription(false));
        Map<String,String> validationErrors = new HashMap<>();
        for(FieldError fieldError : exception.getBindingResult().getFieldErrors() ){
            validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        apiError.setValidationErrors(validationErrors);
        return apiError;
    }
}
