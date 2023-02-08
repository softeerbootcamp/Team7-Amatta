package com.amatta.amatta_server.user;

import com.amatta.amatta_server.user.controller.UserController;
import com.amatta.amatta_server.user.dto.UserFindPasswordByEmailReq;
import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.dto.UserJoinRes;
import com.amatta.amatta_server.user.dto.UserLoginReq;
import com.amatta.amatta_server.user.model.Users;
import com.amatta.amatta_server.user.repository.UserRepository;
import com.amatta.amatta_server.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class UserControllerTest {

    @Autowired
    UserController userController;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("정상 회원가입 테스트")
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
    void join3() {
        UserJoinReq userJoinReq1 = new UserJoinReq(
                "test12@test.com",
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

    @Test
    @DisplayName("정상 로그인 테스트")
    void login1() {
        String email = "test@test.com";
        String password = "testPassword";
        String name = "test";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq1 = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        userController.join(userJoinReq1);

        UserLoginReq userLoginReq = new UserLoginReq(email, password);

        Users user = userService.login(userLoginReq);
        assertEquals(user.getEmail(), email);
        assertEquals(user.getName(), name);
        assertEquals(user.getPhoneNumber(), phoneNumber);
    }

    @Test
    @DisplayName("로그인 실패 테스트")
    void login2() {
        String email = "test@test.com";
        String password = "testPassword";
        String name = "test";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq1 = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        userController.join(userJoinReq1);

        UserLoginReq userLoginReq = new UserLoginReq(email, password + 1);

        Users user = userService.login(userLoginReq);
        assertNull(user);
    }

    @Test
    @DisplayName("비밀번호 이메일로 찾기 테스트")
    void findPassword1() throws Exception {
        //given
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq1 = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        userController.join(userJoinReq1);
        UserFindPasswordByEmailReq userFindPasswordByEmailReq = new UserFindPasswordByEmailReq("taewan", "ktykty0722@naver.com");
        Users BeforeChangePassword = userRepository.findByEmail(userFindPasswordByEmailReq.getEmail());

        //when
        mockMvc.perform(post("/user/find/password/email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userFindPasswordByEmailReq)))
                .andExpect(status().isOk())
                .andDo(print());

        //then
        Users AfterChangePassword = userRepository.findByEmail(userFindPasswordByEmailReq.getEmail());
        SoftAssertions softAssertions = new SoftAssertions();
        softAssertions.assertThat(BeforeChangePassword.getName()).isEqualTo(AfterChangePassword.getName());
        softAssertions.assertThat(BeforeChangePassword.getEmail()).isEqualTo(AfterChangePassword.getEmail());
        softAssertions.assertThat(BeforeChangePassword.getPhoneNumber()).isEqualTo(AfterChangePassword.getPhoneNumber());
        softAssertions.assertThat(BeforeChangePassword.getPassword()).isNotEqualTo(AfterChangePassword.getPassword());
        softAssertions.assertAll();
    }

}
