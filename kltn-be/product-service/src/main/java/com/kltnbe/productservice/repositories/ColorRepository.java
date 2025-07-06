package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Color;
import com.kltnbe.productservice.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    List<Color> findAll();
}
