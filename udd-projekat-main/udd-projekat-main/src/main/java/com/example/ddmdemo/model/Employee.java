package com.example.ddmdemo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "employees")
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    // One employee can be associated with multiple documents (contracts)
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private Set<Document> documents;
}
