package com.portfolio.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.portfolio.entities.UserModel;
import com.portfolio.services.UserService;

@Component
public class FindLoggedInUserId {
    @Autowired 
    private UserService userService;

    //  CLASS TO FING LOGGED IN USER 

    public int loggeInUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // SecurityContextHolder holds  the autnticated user 
        String username = authentication.getName();
        UserModel loggedInUser = userService.findByUsername(username);
        int loggedInUserId = loggedInUser.getId();
        return loggedInUserId;
    }
}
