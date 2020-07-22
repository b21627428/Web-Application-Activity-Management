package com.example.demo.annotation;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IdentificationNumberValidator.class)
public @interface IdentificationNumber {

    String message() default "Must be valid.";
    Class<?>[] groups() default  { };
    Class<? extends Payload>[] payload() default  { };
}

