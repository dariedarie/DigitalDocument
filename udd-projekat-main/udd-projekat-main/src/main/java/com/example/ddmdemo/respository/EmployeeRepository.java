package com.example.ddmdemo.respository;

import com.example.ddmdemo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Employee findByFirstNameAndLastName(String firstName, String lastName);
}
