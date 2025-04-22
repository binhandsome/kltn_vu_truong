package com.demo.entities;

import jakarta.persistence.*;

@Entity
public class Review {{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}}
