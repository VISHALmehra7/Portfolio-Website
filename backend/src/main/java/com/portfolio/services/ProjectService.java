package com.portfolio.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.Dao.ProjectRepo;
import com.portfolio.Dao.UserRepo;
import com.portfolio.entities.ProjectModel;
import com.portfolio.entities.UserModel;
import com.portfolio.helper.FileUpload;
import com.portfolio.helper.FindLoggedInUserId;

@Service
public class ProjectService {
    @Value("${upload.directory}")
    private String uploadDirectory;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FileUpload fileUpload;

    @Autowired
    private FindLoggedInUserId findLoggedInUserId;

    // CREATING A NEW PROJECT

    public ProjectModel addProject(int id, ProjectModel projectModel) {
        try {
            UserModel user = userRepo.findById(id);
            projectModel.setUserModel(user);  
            ProjectModel savedProject = projectRepo.save(projectModel);
            user.getProjectModel().add(savedProject);
            return savedProject;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    // UPLODING THE PROJECT IMAGE

    public String saveProjectImage(int id, MultipartFile file) throws IOException {

        ProjectModel projectModel = projectRepo.findByProjectId(id);
        String fileUploadName = fileUpload.fileUpload(uploadDirectory, file);
        projectModel.setProjectImage(fileUploadName);
         projectRepo.save(projectModel);
       return fileUploadName;

    }

    // GETTING ALL THE PROJECTS

    public List<ProjectModel> getAllProject() {
        List<ProjectModel> projects = (List<ProjectModel>) this.projectRepo.findAll();
        System.out.println("No of project found : " + projects.size());
        return projects;

    }

    // GET ALL THE PROJECT BY THE USER

    public List<ProjectModel> getUserProjects(int id) {
        UserModel user = this.userRepo.findById(id);
        List<ProjectModel> projects = (List<ProjectModel>) this.projectRepo.findProjectsByUserId(user.getId());
        return projects;
    }

    // GETTING ALL THE USER EXCEPT LOGGED IN USER

    public List<ProjectModel> getPorjectsOfUserExcept() {
        int loggedInUserId = findLoggedInUserId.loggeInUserId();
        List<ProjectModel> projects = this.projectRepo.findProjectByUserIdNotEqual(loggedInUserId);
        return projects;
    }

    // GETTING ALL THE PROJECTS OF LOGGED IN USER

    public List<ProjectModel> getProjectOfLoggedInUser() {
        int loggedInUserId = findLoggedInUserId.loggeInUserId();
        List<ProjectModel> projects = this.projectRepo.findProjectsByUserId(loggedInUserId);
        return projects;
    }

    // DELETING A PROJECT

    public void deleteProject(int id) {
        this.projectRepo.deleteById(id);

    }

    // UPDATING A PROJECT BY ITS USER

    public ProjectModel updateProject(int projectId, ProjectModel updatedProject) {

        int loggedInUserId = findLoggedInUserId.loggeInUserId();

        ProjectModel existingProject = projectRepo.findByProjectId(projectId);
        if (existingProject == null) {
            System.out.println("project not found");
            return null;
        }

        if (existingProject.getUserModel().getId() != loggedInUserId) {
            System.out.println("you are not allowed to update the project");
            return null;
        }

        existingProject.setProjectName(updatedProject.getProjectName());
        existingProject.setProjectDescription(updatedProject.getProjectDescription());
        existingProject.setGithubLink(updatedProject.getGithubLink());
        existingProject.setDemoLink(updatedProject.getDemoLink());
        existingProject.setProjectImage(updatedProject.getProjectImage());

        ProjectModel updatedProjectModel = projectRepo.save(existingProject);

        UserModel user = existingProject.getUserModel();
        if (user != null) {
            List<ProjectModel> userProjects = user.getProjectModel();
            userProjects.add(updatedProjectModel);
            userRepo.save(user);
        }

        return updatedProjectModel;
    }


    //SEARCH FUNCTIONALITY
     public List<ProjectModel> searchProjects(String projectName){
        List<ProjectModel> projects = this.projectRepo.findByProjectNameContaining(projectName);
        return projects;
     }
}
