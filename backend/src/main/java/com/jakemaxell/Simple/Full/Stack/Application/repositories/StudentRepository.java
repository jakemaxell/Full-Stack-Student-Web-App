package com.jakemaxell.Simple.Full.Stack.Application.repositories;

import com.jakemaxell.Simple.Full.Stack.Application.models.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {

    @Query("{email : ?0}")
    Student findByEmail(String email);

}
