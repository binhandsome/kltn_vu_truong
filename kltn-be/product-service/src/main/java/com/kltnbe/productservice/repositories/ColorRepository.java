package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
        Optional<Color> findByNameColor(String nameColor);
        List<Color> findAllByStatus(Integer status);
        List<Color> findByNameColorIn(List<String> names);

}
