package com.group.backend.controller;

import com.group.backend.services.SubAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:5173/", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class SubAdminController {
    @Autowired
    SubAdminService subAdminService;


    @GetMapping("/get-enquiries")
    public List<Map<String, Object>> getEnquiries() {
        return subAdminService.getEnquiries();
    }

    @GetMapping("/get-request")
    public List<Map<String, Object>> getProductsAtLevel0() {
        return subAdminService.getProductsAtLevel0();
    }

    @PostMapping("/adding-seller")
    public ResponseEntity<Map<String, Object>> addSeller(@RequestBody Map<String, Object> body) {
        return subAdminService.addSeller(body);
    }}