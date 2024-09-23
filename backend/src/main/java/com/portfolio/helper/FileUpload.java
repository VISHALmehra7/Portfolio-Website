package com.portfolio.helper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUpload {

    public String fileUpload(String fileDirectory, MultipartFile file) throws IOException {

        String originalFileName = file.getOriginalFilename();
        File dir = new File(fileDirectory);
        if (!dir.exists()) {
            System.out.println("Directory does not exist!!" + fileDirectory);
            dir.mkdirs();
        }
        try {
            Path fileNameAndPath = Paths.get(fileDirectory, originalFileName);
            Files.write(fileNameAndPath, file.getBytes());
            System.out.println(fileNameAndPath);
            return originalFileName;
        } catch (Exception e) {
            System.out.println("error in fileUpload method" + e);
            throw new IOException("Failed to upload file", e);

        }

    }

}
