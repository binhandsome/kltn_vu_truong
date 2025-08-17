package com.kltnbe.recommendservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "save_history_user_search_image")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveHistorySearchImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int history_id;
    @Column(columnDefinition = "text")
    private String recommendAsins;

    private Long authId;

    @CreationTimestamp
    private Timestamp createdAt;


}
