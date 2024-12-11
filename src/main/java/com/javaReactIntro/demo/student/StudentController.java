package com.javaReactIntro.demo.student;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "java-react-api/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents(){
        List<Student> students = Arrays.asList(
            new Student(
                1L,
                "John",
                "john.doe@gmail.com",
                Gender.MALE
            ),
            new Student(
                2L,
                "Jane",
                "jane.doe@gmail.com",
                Gender.FEMALE
            )
        );
        return students;
    }

}
