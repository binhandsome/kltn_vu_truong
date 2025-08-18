package com.kltnbe.adminservice.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "save_history_action_recommend")
@Data
public class SaveHistoryActionRecommend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actionRecommendId;
    private String fileSave;
    private Integer topK;
    private Integer step;
    @CreationTimestamp
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;
}
