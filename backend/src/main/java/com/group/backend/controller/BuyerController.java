package com.group.backend.controller;

import com.group.backend.services.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(value = "http://localhost:5173/")
@RequestMapping("/api")
public class BuyerController {
    @Autowired
    BuyerService buyerService;

    @GetMapping("/get-categories")
    public List<Map<String,Object>>getCategories() {
        return buyerService.getCategories();
    }
    @GetMapping("/get-products")
    public List<Map<String,Object>> getProducts() {
        return buyerService.getProducts();
    }
    @PostMapping("/submit-enquiry")
    public Map<String,Object> submitEnquiry(@RequestBody Map<String,Object> body) throws Exception {
        return buyerService.submitEnquiry(body);
    }
    @GetMapping("/get-product/{id}")
    public Map<String,Object> getProduct(@PathVariable int id) {
        return buyerService.getProduct(id);
    }




}
