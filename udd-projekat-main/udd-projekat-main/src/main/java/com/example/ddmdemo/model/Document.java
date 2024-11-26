package com.example.ddmdemo.model;

import com.example.ddmdemo.model.enums.DocumentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "mime_type")
    private String mimeType;

    @Column(name = "server_filename")
    private String serverFilename;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "document_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    // Many documents can be related to one government
    @ManyToOne
    @JoinColumn(name = "government_id", nullable = true)
    private Government government;

    // Many documents can be related to one employee
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = true)
    private Employee employee;
}
