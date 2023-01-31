package com.amatta.amatta_server;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class DatabaseTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @DisplayName("DB에 값 INSERT 후 가져오기")
    @Test
    @Transactional
    void DB_TEST() {
        try {
            int result = jdbcTemplate.update("insert into users(email, password, name, phoneNumber) values (?, ?, ?, ?)",
                    "emailasdfs", "paasdfssword", "naasdfme", "phonasdfeNums");

            assertEquals(1, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
