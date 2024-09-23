package com.portfolio.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.portfolio.entities.ProjectModel;

@Repository
public interface ProjectRepo extends CrudRepository<ProjectModel, Integer> {
    public ProjectModel findByProjectId(int id);


    //FIND PROJECT OF A  USER BY USER ID
    @Query("SELECT p FROM ProjectModel p WHERE p.userModel.id =:userId")
    public List<ProjectModel> findProjectsByUserId(@Param("userId") int userId);

     //FIND PROJECT OF ALL THE USERS EXCEPT OF LOGGED IN USER 
    @Query("SELECT p FROM ProjectModel p WHERE p.userModel.id <>:userId")
    public List<ProjectModel> findProjectByUserIdNotEqual(@Param("userId") int userId);

    // SEARCH PROJECT QUERY
    public List<ProjectModel> findByProjectNameContaining(String projectName);
       

}
