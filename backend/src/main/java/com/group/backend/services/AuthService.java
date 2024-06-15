package com.group.backend.services;

import com.group.backend.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {
    @Autowired
    AuthRepository authRepository ;
    public Map<String, Object> loginUser(Map<String, Object> body) {
        String email = (String) body.get("email");
        String password = (String) body.get("password");
        return authRepository.loginUser(email , password);
    }

}
