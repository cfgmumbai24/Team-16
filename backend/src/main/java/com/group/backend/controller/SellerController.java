package com.group.backend.controller;

import com.group.backend.services.SellerService;
import jakarta.mail.Multipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@CrossOrigin(value = "http://127.0.0.1:5173/", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class SellerController {
    @Autowired
    SellerService sellerService;
    @PostMapping("/add")
    public ResponseEntity<Map<String,String>> addProduct(@RequestParam MultipartFile file , @RequestParam String name, @RequestParam String price, @RequestParam String description, @RequestParam int category_id)
    {
        System.out.println("fileContent = " + file);  return sellerService.addProduct(file,name,price,description,category_id);
    }
    @GetMapping(value = "/getUploadfiles/{file}",produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getImage(@PathVariable String file) throws IOException {
        System.out.println(file);
        String filename = file.replace("=", "/");
        File serverFile = new File("images/" + filename);
        return Files.readAllBytes(serverFile.toPath());
    }
}
