package com.portfolio.services;

import java.io.IOException;
import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.Dao.UserRepo;
import com.portfolio.entities.UserModel;
import com.portfolio.helper.FileUpload;

@Service
public class UserService {

    @Value("${upload.directory}")
    private String uploadDirectory;

    @Autowired
    AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private FileUpload fileUpload;



    // CREATING AND SAVING THE USER TO DATABASE

    public UserModel addUser(UserModel user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return this.userRepo.save(user);
    }

    // GETTING USER BY USERNAME

    public UserModel findByUsername(String username) {
        return this.userRepo.findByUsername(username);
    }

    // VERIFYING THE USER IS LOGGEDF IN OR NOT

    public String verify(UserModel userModel) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userModel.getUsername(), userModel.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(userModel.getUsername());
        }

        return "failed";
    }

    // GETTING ALL THE USERS

    public List<UserModel> getUsers() {
        List<UserModel> users = (List<UserModel>) this.userRepo.findAll();
        return users;

    }

    // IMAGE UPLOADING FOR USERS

    public UserModel imageUpload(int id, MultipartFile file) throws IOException {

        UserModel user = this.userRepo.findById(id);
        String fileUploadName = fileUpload.fileUpload(uploadDirectory, file);
        user.setProfilePic(fileUploadName);
        userRepo.save(user);
        return user;

    }

    // FILTERING ALL THE USER FROM LOGGED IN USER

    public List<UserModel> getUsersExcept(int loggedInUserId) {
        List<UserModel> users = (List<UserModel>) this.userRepo.findAll();
        return users.stream()
                .filter(user -> user.getId() != loggedInUserId)
                .collect(Collectors.toList());

    }

    public UserModel LoggedInUser(int id) {
        UserModel user = this.userRepo.findById(id);
        return user;
    }

}
