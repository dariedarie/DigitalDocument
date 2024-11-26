package com.example.ddmdemo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "governments")
public class Government {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "level", nullable = false)
    private String level;

    // One government can have multiple documents (contracts)
    @OneToMany(mappedBy = "government", cascade = CascadeType.ALL)
    private Set<Document> documents;
}
