package com.group.backend.services;

import com.group.backend.repository.BuyerRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BuyerService {
@Autowired
BuyerRepository buyerRepository;
    public List<Map<String,Object>> getCategories() {
        return buyerRepository.getCategories();
    }

    public List<Map<String,Object>>  getProducts() {
        return buyerRepository.getProducts();
    }

    public Map<String,Object> submitEnquiry(Map<String,Object> body) throws MessagingException {
        String name = (String) body.get("name");
        String email = (String) body.get("email");
        String phone = (String) body.get("phone");

        String additionalInfo = (String) body.get("additionalInfo");
        List<Map<String,Object>>  cartItems= (List<Map<String, Object>>) body.get("cartItems");
         return buyerRepository.submitEnquiry(name, email, phone, additionalInfo , cartItems);
    }

}
