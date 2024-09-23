package com.portfolio.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @NotBlank
    @Size(min = 3, message = "fullName must be atleat 3 characters")
    private String fullName;
    @NotBlank
    @Size(min = 3, message = "usename must be atleat be atleast 3 charaters")
    @Column(unique = true)
    private String username;
    @NotBlank
    @Size(min = 6, message = "password must be atleast 6 characters")
    private String password;
    @Transient
    private String confirmPassword;
    private String profilePic;
    private String userDescription;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userModel")
    @JsonManagedReference
    private List<ProjectModel> projectModel;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public List<ProjectModel> getProjectModel() {
        return projectModel;
    }

    public void setProjectModel(List<ProjectModel> projectModel) {
        this.projectModel = projectModel;
    }
    public String getUserDescription() {
        return userDescription;
    }

    public void setUserDescription(String userDescription) {
        this.userDescription = userDescription;
    }


    public UserModel() {
    }

    public UserModel(int id, @NotBlank @Size(min = 3, message = "fullName must be atleat 3 characters") String fullName,
            @NotBlank @Size(min = 3, message = "usename must be atleat be atleast 3 charaters") String username,
            @NotBlank @Size(min = 6, message = "password must be atleast 6 characters") String password,
            String confirmPassword, String profilePic, String userDescription, List<ProjectModel> projectModel) {
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.profilePic = profilePic;
        this.userDescription = userDescription;
        this.projectModel = projectModel;
    }








}
