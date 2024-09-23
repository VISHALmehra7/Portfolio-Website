package com.portfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.entities.UserModel;
import com.portfolio.helper.FindLoggedInUserId;
import com.portfolio.services.UserService;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FindLoggedInUserId findLoggedInUserId;

    // GETTING ALL THE USRS EXCEPT LOGGED IN USER

    @GetMapping("/users/all")
    public ResponseEntity<List<UserModel>> getAllUsers() {

        try {
            int loggedInUserId = findLoggedInUserId.loggeInUserId();
            List<UserModel> users = this.userService.getUsersExcept(loggedInUserId);
            return ResponseEntity.of(Optional.of(users));

        } catch (Exception e) {
            System.out.println("Error in getAllUsers controller" + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/users/loggedin-user")
    public ResponseEntity<Object> findLoggedInUser() {
        try {
            int id = this.findLoggedInUserId.loggeInUserId();
            UserModel userModel = userService.LoggedInUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(userModel);
        } catch (Exception e) {
            System.out.println("error in findLoggedInUser controller " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching  logged in  user");
        }

    }

}
