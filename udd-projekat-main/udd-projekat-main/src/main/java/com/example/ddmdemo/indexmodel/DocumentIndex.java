package com.example.ddmdemo.indexmodel;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "document_index")
@Setting(settingPath = "/configuration/serbian-analyzer-config.json")
public class DocumentIndex {
    @Id
    private String id;

    @Field(type = FieldType.Keyword, store = true, name = "first_name")
    private String firstName;

    @Field(type = FieldType.Keyword, store = true, name = "last_name")
    private String lastName;

    @Field(type = FieldType.Keyword, store = true, name = "government_name")
    private String governmentName;

    @Field(type = FieldType.Keyword, name = "level_of_administration")
    private String levelOfAdministration;

    @Field(type = FieldType.Text, name = "title")
    private String title;

    @Field(type = FieldType.Text, name = "content_sr", analyzer = "serbian_simple", searchAnalyzer = "serbian_simple")
    private String contentSr;

    @Field(type = FieldType.Text, name = "content_en", analyzer = "english", searchAnalyzer = "english")
    private String contentEn;

    @Field(type = FieldType.Text, name = "server_filename")
    private String serverFilename;

    @Field(type = FieldType.Integer, name = "database_id")
    private Integer databaseId;
}
