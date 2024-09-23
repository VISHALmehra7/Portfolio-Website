package com.portfolio.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.entities.UserModel;
import com.portfolio.helper.ErrorResponse;
import com.portfolio.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserService userService;

    // SIGNUP ROUTE
    @PostMapping("/signup")
    public ResponseEntity<Object> signUp(@Valid @RequestBody UserModel userModel) {
        UserModel u = null;
        try {
            if (!userModel.getPassword().equals(userModel.getConfirmPassword())) {
                ErrorResponse errorResponse = new ErrorResponse(false,"Passwords do not match");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
            if (userService.findByUsername(userModel.getUsername()) != null) {
                ErrorResponse errorResponse = new ErrorResponse(false,"user already exists");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

            }

            u = userService.addUser(userModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(u);

        } catch (Exception e) {
            System.out.println("error in signup controller : " + e);
            ErrorResponse errorResponse = new ErrorResponse(false,"Signup failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }

    // LOGIN ROUTE
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserModel userModel) {
        try{

            String token = userService.verify(userModel);
            UserModel loggedInUser = this.userService.findByUsername(userModel.getUsername());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", loggedInUser);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch(Exception e){
            System.out.println("Error in login controller");
            ErrorResponse errorResponse = new ErrorResponse(false,"login failed");
            return ResponseEntity.status(HttpStatus.OK).body(errorResponse);

        }
        

    }

    // LOGOUT ROUTE
    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request, HttpServletResponse response) {
        try {

            return ResponseEntity.status(HttpStatus.OK).body("Logged out successfully!!");
        } catch (Exception e) {
            System.out.println("Error in logout controller" + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    // UPLOADING PROFILE PIC OF USERS ROUTE

    @PostMapping("/upload/{userId}")
    public ResponseEntity<Object> uploadImageToUser(@PathVariable("userId") int userId,
            @RequestParam("file") MultipartFile file) {
        try {
        UserModel updatedUser =    userService.imageUpload(userId, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser);
        } catch (Exception e) {
            System.out.println("Error in uploadImageToUser controller" + e);
            ErrorResponse errorResponse = new ErrorResponse(false,"Image upload failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }

}
