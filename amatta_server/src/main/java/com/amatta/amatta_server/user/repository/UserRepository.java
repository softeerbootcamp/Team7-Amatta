package com.amatta.amatta_server.user.repository;

import com.amatta.amatta_server.user.model.Users;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    @Query("SELECT * FROM users WHERE email = :email")
    Users findByEmail(@Param("email") String email);

    @Query("SELECT * FROM users WHERE phoneNumber = :phoneNumber")
    Users findByPhoneNum(@Param("phoneNumber") String phoneNumber);

    @Query("SELECT * FROM users WHERE name = :name AND phoneNumber = :phoneNumber")
    Users findByNameAndPhoneNum(@Param("name") String name, @Param("phoneNumber") String phoneNumber);

    @Modifying
    @Transactional
    @Query("INSERT INTO users(email, password, name, phoneNumber) VALUES (:email, :password, :name, :phoneNumber)")
    void addUser(@Param("email") String email, @Param("password") String password, @Param("name") String name, @Param("phoneNumber") String phoneNumber);

}
