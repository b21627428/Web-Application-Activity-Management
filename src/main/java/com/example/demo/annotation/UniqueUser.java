package com.example.demo.annotation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueUserValidator.class)
public @interface UniqueUser {

    String message() default "The user already exist";
    Class<?>[] groups() default  { };
    Class<? extends Payload>[] payload() default  { };
}
