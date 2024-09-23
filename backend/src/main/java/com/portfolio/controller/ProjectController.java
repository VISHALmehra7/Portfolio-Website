package com.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.portfolio.entities.ProjectModel;
import com.portfolio.services.ProjectService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // ADDING NEW PROJECT BY THE USER

    @PostMapping("add/{userId}")
    public ResponseEntity<Object> addProject(@PathVariable("userId") int userId,
            @RequestBody ProjectModel projectModel) {
        ProjectModel project = null;
        try {
            project = this.projectService.addProject(userId, projectModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(project);
        } catch (Exception e) {
            System.out.println("Error in addProject controller : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    // UPLOAD IMAGE FOR PROJECT ROUTE

    @PostMapping("/upload/{projectId}")
    public ResponseEntity<Object> uploadImage(@PathVariable("projectId") int projectId,
            @RequestParam("file") MultipartFile file) throws NullPointerException {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty or not provided.");

        }

        try {
            String name = projectService.saveProjectImage(projectId, file);
            // return ResponseEntity.status(HttpStatus.CREATED).body("Image is uploaded");
            return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/images/")
                    .path(file.getOriginalFilename()).toUriString());

        } catch (Exception e) {
            System.out.println("Error in uploadImage controller" + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    // GET ROUTE TO GET ALL THE PROJECTS

    @GetMapping("/all")
    public ResponseEntity<List<ProjectModel>> allProjects() {
        try {
            List<ProjectModel> projects = this.projectService.getAllProject();
            return ResponseEntity.status(HttpStatus.OK).body(projects);
        } catch (Exception e) {
            System.out.println("Errorn in allProjects controller ");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // CONTROLLER TO GET PROJECTS BY A USER

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectModel>> getUserProject(@PathVariable("userId") int userId) {
        try {
            List<ProjectModel> projects = this.projectService.getUserProjects(userId);
            return ResponseEntity.status(HttpStatus.OK).body(projects);
        } catch (Exception e) {
            System.out.println("Error in getUserProjects controller  " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CONTROLLER FOR GETTING ALL THE PROJECT EXCEPT LOGGED IN USER

    @GetMapping("/user-except")
    public ResponseEntity<List<ProjectModel>> getProjectsExceptLoggedInUser() {
        try {
            List<ProjectModel> projects = this.projectService.getPorjectsOfUserExcept();
            return ResponseEntity.status(HttpStatus.OK).body(projects);
        } catch (Exception e) {
            System.out.println("Error in getPorjectsOfUserExcept controller " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CONTROLLER TO GET THE PROJECTS OF THE LOGGED IN USER

    @GetMapping("/loggedin-user")
    public ResponseEntity<List<ProjectModel>> projectofLoggedInUser() {
        try {
            List<ProjectModel> projects = this.projectService.getProjectOfLoggedInUser();
            return ResponseEntity.status(HttpStatus.OK).body(projects);
        } catch (Exception e) {
            System.out.println("Error in gcontroller ProjectofLoggedInUser " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CONTROLLER TO DELETE A PROJECT

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<Object> deleteProject(@PathVariable("projectId") int projectId) {
        try {
            this.projectService.deleteProject(projectId);
            return ResponseEntity.status(HttpStatus.OK).body(" Deleted !!");
        } catch (Exception e) {
            System.out.println("Error in deleteProject controller " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    // CONTROLLER TO UPDATE A PROJECT

    @PutMapping("/update/{projectId}")
    public ResponseEntity<ProjectModel> updateProject(@PathVariable("projectId") int projectId,
            @RequestBody ProjectModel updatedProject) {

        try {
            ProjectModel project = this.projectService.updateProject(projectId, updatedProject);
            return ResponseEntity.status(HttpStatus.OK).body(project);
        } catch (Exception e) {
            System.out.println("Error in updateProject controller " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    
    // SEARCH CONTROLLER

    @GetMapping("/search/{query}")
    public ResponseEntity<List<ProjectModel>> searchProjectByQuery(@PathVariable("query") String query) {

        try {
            List<ProjectModel> projects = this.projectService.searchProjects(query);
            return ResponseEntity.status(HttpStatus.OK).body(projects);
        } catch (Exception e) {
            System.out.println("Error in searchProjectByQuery controller : " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
