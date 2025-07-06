package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.entities.Color;
import com.kltnbe.productservice.services.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/colors")
public class ColorController {
    @Autowired
    private ColorService colorService;
    @GetMapping("/getAll")
    public List<Color> getAllColors() {
        return colorService.findAll();
    }
}
