package com.group.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class SellerRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public int uploads(String file , String name , String price, String description, int category_id)
    {
        Map<String,Object> map = jdbcTemplate.queryForMap("SELECT category_iniitials from category where category_id = ?",category_id);

        String SKU = (String) map.get("category_iniitials")+name.substring(0,2);

        return jdbcTemplate.update("INSERT INTO [dbo].[products] ([product_name] ,[SKU] ,[product_price] ,[product_description] ,[category_id] ,[product_image]) VALUES (?,?,?,?,?,?)",name,SKU,price,description,category_id,file);
    }


}
