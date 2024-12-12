package com.javaReactIntro.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {
    
    private final StudentRepository studentRepo;

    public List<Student> getAllStudents(){
        return studentRepo.findAll();
    }

    public void addStudent(Student student){
        studentRepo.save(student);
    }
}
