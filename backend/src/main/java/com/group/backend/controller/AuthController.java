package com.group.backend.controller;

import com.group.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(value = "http://127.0.0.1:5173/", allowCredentials = "true")
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;
    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody Map<String, Object> body) {
        System.out.println(authService.loginUser(body));
        return authService.loginUser(body);
    }
}
