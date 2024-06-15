package com.group.backend.services;

import com.group.backend.repository.SubAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SubAdminService {

    @Autowired
    private SubAdminRepository subAdminRepository;


    public List<Map<String,Object>> getEnquiries()
    {
        return subAdminRepository.getEnquiries();
    }
    public List<Map<String, Object>> getProductsAtLevel0() {
        return subAdminRepository.getProductsAtLevel0();
    }
    public ResponseEntity<Map<String,Object>> addSeller(Map<String,Object> body)
    {
           String name = (String) body.get("fullname");
           String email = (String) body.get("email");
           String password = (String) body.get("password");
           int category_id = (int) body.get("category_id");
           int role_id = 3;
           int no_of_rows = subAdminRepository.addSeller(name,email,password,category_id,role_id);
              if(no_of_rows == 1)
              {
                return ResponseEntity.ok(Map.of("message","Seller added successfully"));
              }
              else
              {
                return ResponseEntity.ok(Map.of("message","Seller not added"));
              }
    }


}
