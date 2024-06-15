package com.group.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class AuthRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public Map<String, Object> loginUser(String email, String password) {
        try {
            Map<String, Object> user = jdbcTemplate.queryForMap("EXEC sp_login_user  ?, ?", email, password);
            return user;
        } catch (Exception e) {
            return null;
        }
    }

}
