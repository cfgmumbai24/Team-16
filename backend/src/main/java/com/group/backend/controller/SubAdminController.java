package com.group.backend.controller;

import com.group.backend.services.SubAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://127.0.0.1:5173/", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class SubAdminController {
    @Autowired
    SubAdminService subAdminService;


    @GetMapping("/get-enquiries")
    public List<Map<String, Object>> getEnquiries() {
        return subAdminService.getEnquiries();
    }

}
