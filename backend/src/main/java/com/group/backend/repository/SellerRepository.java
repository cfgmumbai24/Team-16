package com.group.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.security.SecureRandom;
import java.util.Map;

@Repository
public class SellerRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 6;
    public int uploads(String file , String name , String price, String description, int category_id)
    {
        Map<String,Object> map = jdbcTemplate.queryForMap("SELECT category_iniitials from category where category_id = ?",category_id);
        String randomCode = generateRandomCode(CODE_LENGTH);
        String SKU = (String) map.get("category_iniitials")+name.substring(0,2)+randomCode;

        return jdbcTemplate.update("INSERT INTO [dbo].[products] ([product_name] ,[SKU] ,[product_price] ,[product_description] ,[category_id] ,[product_image]) VALUES (?,?,?,?,?,?)",name,SKU,price,description,category_id,file);
    }
    public static String generateRandomCode(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(CHARACTERS.length());
            code.append(CHARACTERS.charAt(index));
        }

        return code.toString();
    }

    public String getCategory(int category_id)
    {
        return jdbcTemplate.queryForObject("SELECT category_name from category where category_id = ?",String.class,category_id);
    }


}
