package com.amatta.amatta_server.user.repository;

import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.model.Users;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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

    public Users findByEmail(String email) {
        try {
            return jdbcTemplate.queryForObject("select * from users where email = ?", userRowMapper(), email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Users findByPhoneNum(String phoneNumber) {
        try {
            return jdbcTemplate.queryForObject(
                    "select * from users where phoneNumber = ?", userRowMapper(), phoneNumber);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
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

    private RowMapper<Users> userRowMapper() {
        return (resultSet, rowNum) -> {
            long userId = (resultSet.getLong("id"));
            String userEmail = (resultSet.getString("email"));
            String userPassword = (resultSet.getString("password"));
            String userName = (resultSet.getString("name"));
            String userPhoneNum = (resultSet.getString("phoneNumber"));
            return new Users(userId, userEmail, userPassword, userName, userPhoneNum);
        };
    }
}
