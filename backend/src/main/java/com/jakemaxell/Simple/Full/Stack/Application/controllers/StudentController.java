package com.jakemaxell.Simple.Full.Stack.Application.controllers;

import com.jakemaxell.Simple.Full.Stack.Application.models.Student;
import com.jakemaxell.Simple.Full.Stack.Application.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // POST
    @PostMapping("/saveStudent")
    private void saveStudent(@RequestBody Student student){
        studentService.saveStudentData(student);
    }

    // GET
    @GetMapping("/getStudentById/{id}")
    private Optional<Student> getStudentById(@PathVariable("id") String studentId){
        return studentService.getStudentById(studentId);
    }

}
