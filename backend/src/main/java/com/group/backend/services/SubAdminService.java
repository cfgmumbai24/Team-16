package com.group.backend.services;

import com.group.backend.repository.SubAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SubAdminService {

    @Autowired
    private SubAdminRepository subAdminRepository;

    public List<Map<String, Object>> getCategories() {
        return subAdminRepository.getCategories();
    }
    public  List<Map<String,Object>> getProducts()
    {
        return subAdminRepository.getProducts();
    }
    public List<Map<String,Object>> getEnquiries()
    {
        return subAdminRepository.getEnquiries();
    }


}
