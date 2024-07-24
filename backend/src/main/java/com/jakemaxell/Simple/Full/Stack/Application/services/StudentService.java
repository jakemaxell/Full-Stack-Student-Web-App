package com.jakemaxell.Simple.Full.Stack.Application.services;

import com.jakemaxell.Simple.Full.Stack.Application.models.Student;
import com.jakemaxell.Simple.Full.Stack.Application.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public void saveStudentData(Student student){
        if(!student.checkValues()){
            return;
        }
        studentRepository.save(student);
    }

    public Optional<Student> getStudentById(String studentId){
        return studentRepository.findById(studentId);
    }

    public Optional<Student> getStudentByEmail(String email) {
        return Optional.ofNullable(studentRepository.findByEmail(email.toLowerCase(Locale.ROOT)));
    }

}
