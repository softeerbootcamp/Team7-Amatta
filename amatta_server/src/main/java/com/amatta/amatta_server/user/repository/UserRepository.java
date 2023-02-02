package com.amatta.amatta_server.user.repository;

import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.model.Users;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    @Query("SELECT * FROM users WHERE email = :email")
    Users findByEmail(@Param("email") String email);

    @Query("SELECT * FROM users WHERE phoneNumber = :phoneNumber")
    Users findByPhoneNum(@Param("phoneNumber") String phoneNumber);

    @Query("INSERT INTO users(email, password, name, phoneNumber) VALUES (user.email, user.password, user.name, user.phoneNumber)")
    void addUser(@Param("user") UserJoinReq userJoinReq);
}
