package com.group.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SubAdminRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public List<Map<String,Object>> getCategories()
    {
        return jdbcTemplate.queryForList("SELECT * FROM category");
    }
    public List<Map<String,Object>> getProducts()
    {
        return jdbcTemplate.queryForList("SELECT * FROM products");
    }
    public List<Map<String,Object>> getEnquiries()
    {
        return jdbcTemplate.queryForList("SELECT * FROM enquiries e INNER JOIN enquiry_products ep ON e.enquiry_id = ep.enquiry_id INNER JOIN products p ON ep.product_id = p.product_id");
    }
    public List<Map<String,Object>> getProductsAtLevel0()
    {
        return jdbcTemplate.queryForList("SELECT * FROM products p where statusLevel =0 ");
    }
    public int addSeller(String name,String email,String password,int category_id,int role_id)
    {
        return jdbcTemplate.update("EXEC sp_register_user ? , ? , ?,  ?, ? , ? ",email,name,password,role_id,category_id);
    }

    public Map<String,Object> getProductById(int id)
    {
        return jdbcTemplate.queryForMap("SELECT * FROM products WHERE product_id = ?",id);
    }

}
