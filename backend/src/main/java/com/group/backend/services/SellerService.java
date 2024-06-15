package com.group.backend.services;

import com.group.backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@Service
public class SellerService {
    @Autowired
    SellerRepository sellerRepository;

    public ResponseEntity<Map<String,String>> addProduct(MultipartFile file , String name , int price, String description, int category_id){
        System.out.println("fileContent = " + file);
        String category = sellerRepository.getCategory(category_id);
        Path uploads = Paths.get("images/"+category+"/");
        if(!Files.exists(uploads)) {
            try {
                Files.createDirectory(uploads);
            } catch (IOException e) {
                throw new RuntimeException("Could not create directory");
            }
        }



        System.out.println(file.getOriginalFilename());
        String cleandFileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path newPath = uploads.resolve(cleandFileName);
        try
        {
            InputStream is = file.getInputStream();
            Files.copy(is,newPath, StandardCopyOption.REPLACE_EXISTING);
            sellerRepository.uploads(category+"="+file.getOriginalFilename(),name,price,description,category_id);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println(newPath.toString()+" "+newPath);
        var result = Map.of(
                "filename", file.getOriginalFilename(),
                "fileUri", newPath.toString()
        );
        return ok().body(result);
    }


}
