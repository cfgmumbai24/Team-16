package com.group.backend.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SubAdminRepository {
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
        return jdbcTemplate.queryForList("SELECT * FROM orders o INNER JOIN order_products op ON o.order_id = op.order_id INNER JOIN products p ON op.product_id = p.product_id");
    }
    public List<Map<String,Object>> updateStatus()
    {
        return jdbcTemplate.queryForList("SELECT * FROM orders o INNER JOIN order_products op ON o.order_id = op.order_id INNER JOIN products p ON op.product_id = p.product_id");
    }

}
