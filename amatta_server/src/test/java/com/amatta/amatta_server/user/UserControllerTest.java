package com.amatta.amatta_server.user;

import com.amatta.amatta_server.user.controller.UserController;
import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.dto.UserJoinRes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    UserController userController;

    @Test
    @DisplayName("정상 회원가입 테스트")
    @Transactional
    void join1() {
        UserJoinReq userJoinReq = new UserJoinReq(
                "test@test.com",
                "testPassword",
                "test",
                "010-0000-0000"
        );
        ResponseEntity<?> response = userController.join(userJoinReq);
        UserJoinRes userJoinRes = (UserJoinRes) response.getBody();
        assertEquals(response.getStatusCode(), HttpStatus.CREATED);
        assertTrue(userJoinRes.getSuccess());
    }

    @Test
    @DisplayName("회원가입 테스트 - 중복된 이메일 입력")
    @Transactional
    void join2() {
        UserJoinReq userJoinReq1 = new UserJoinReq(
                "test@test.com",
                "testPassword",
                "test",
                "010-0000-0000"
        );
        UserJoinReq userJoinReq2 = new UserJoinReq(
                "test@test.com",
                "testPassword",
                "test",
                "010-0000-1111"
        );
        userController.join(userJoinReq1);

        assertThrows(DuplicateKeyException.class, () -> {
            userController.join(userJoinReq2);
        });
    }

    @Test
    @DisplayName("회원가입 테스트 - 중복된 전화번호 입력")
    @Transactional
    void join3() {
        UserJoinReq userJoinReq1 = new UserJoinReq(
                "test1@test.com",
                "testPassword",
                "test",
                "010-0000-0000"
        );
        UserJoinReq userJoinReq2 = new UserJoinReq(
                "test@test.com",
                "testPassword",
                "test",
                "010-0000-0000"
        );
        userController.join(userJoinReq1);

        assertThrows(DuplicateKeyException.class, () -> {
            userController.join(userJoinReq2);
        });
    }


}
