package com.group.backend.repository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BuyerRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    JavaMailSender javaMailSender;

    public List<Map<String, Object>> getCategories() {
        try {
            return jdbcTemplate.queryForList("SELECT * from category");
        } catch (Exception e) {
            return null;
        }
    }
    public List<Map<String,Object>> getProducts() {
        try {
            List<Map<String, Object>> products = jdbcTemplate.queryForList("SELECT * from products");
            System.out.println(products);
            return products;
        } catch (Exception e) {
            return null;
        }
    }
    public void sendMail(String email,String name , String phone) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        try {
            mimeMessageHelper.setSubject("New Order!");
            mimeMessageHelper.setTo(email);

            // HTML content for the email body
            String htmlContent = "<html>" +
                    "<body style=\"font-family: Arial, sans-serif;\">" +
                    "<h2>YOU HAVE A NEW ORDER!</h2>" +
                    "<p>from .</p> " + name + " <p>Phone Number: </p>" + phone + "<p>Email: </p>" + email +
                    "<p>Thank you!</p>" +
                    "</body>" +
                    "</html>";

            mimeMessageHelper.setText(htmlContent, true); // Set the HTML content
        } catch (Exception e) {
            e.printStackTrace();
        }
        javaMailSender.send(mimeMessage);
        System.out.println("Email sent to :: " + email);
    }

    public Map<String, Object> submitEnquiry(String name, String email, String phone, String additionalInfo , List<Map<String,Object>> cartItems) throws MessagingException {
        System.out.println("name = " + name + " email = " + email + " phone = " + phone + " additionalInfo = " + additionalInfo + " cartItems = " + cartItems);
        Map<String,Object> newId = jdbcTemplate.queryForMap("EXEC insert_enquiry ?, ?, ?, ?", name , email , phone , additionalInfo);
        for(int i =0;i<cartItems.size();i++){
            Map<String,Object> cartItem = cartItems.get(i);
            jdbcTemplate.update("INSERT INTO [dbo].[enquiry_products] ([enquiry_id],[product_id],[quantity]) VALUES  (?, ?, ?)", (int)newId.get("new_id"),(int) cartItem.get("productId"),(int) cartItem.get("quantity"));
        }
        if((int)newId.get("new_id")>0){
            sendMail(email,name,phone);
            return Map.of("message", "Enquiry submitted successfully");
        }
        return Map.of("message", "Enquiry not submitted");
    }

    public Map<String, Object> getProduct(int id) {
        try {
            return jdbcTemplate.queryForMap("SELECT * from products where product_id = ?", id);
        } catch (Exception e) {
            return null;
        }
    }


}
