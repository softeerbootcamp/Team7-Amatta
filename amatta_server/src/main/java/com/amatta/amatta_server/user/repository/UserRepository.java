package com.amatta.amatta_server.user.repository;

import com.amatta.amatta_server.user.dto.UserJoinReq;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Value("${key}")
    private String key;
    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addUser(UserJoinReq userJoinReq) {
        this.jdbcTemplate.update(
                "insert into users(email, password, name, phoneNumber) values (?, ?, ?, ?)",
                userJoinReq.getEmail(),
                BCrypt.hashpw(userJoinReq.getPassword(), BCrypt.gensalt()),
                userJoinReq.getName(),
                userJoinReq.getPhoneNumber()
        );
    }
}
