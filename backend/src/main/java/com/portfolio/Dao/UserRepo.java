package com.portfolio.Dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.portfolio.entities.UserModel;

@Repository
public interface UserRepo extends CrudRepository<UserModel, Integer> {

    public UserModel findByUsername(String username);

    public UserModel findById(int id);

}