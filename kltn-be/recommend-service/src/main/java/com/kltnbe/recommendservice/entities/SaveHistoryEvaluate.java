package com.kltnbe.recommendservice.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "save_history_evaluate")
public class SaveHistoryEvaluate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyEvaluateId;
    private String asin;
    private Long authId;
    @CreationTimestamp
    private Timestamp createdAt;
}
