package com.amatta.amatta_server.user;

import com.amatta.amatta_server.fcm.controller.FCMController;
import com.amatta.amatta_server.fcm.dto.TokenRegisterDto;
import com.amatta.amatta_server.fcm.model.FCMToken;
import com.amatta.amatta_server.fcm.repository.DeviceTokenRepository;
import com.amatta.amatta_server.user.controller.UserController;
import com.amatta.amatta_server.user.dto.UserChangePasswordReq;
import com.amatta.amatta_server.user.dto.UserFindPasswordByEmailReq;
import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.dto.UserLoginReq;
import com.amatta.amatta_server.user.repository.UserRepository;
import com.amatta.amatta_server.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class UserControllerTest {

    @Autowired
    UserController userController;
    @Autowired
    FCMController fcmController;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    DeviceTokenRepository tokenRepository;
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("?????? ???????????? ?????????")
    void join1() throws Exception{
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );

        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(jsonPath("success").value(true))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @DisplayName("???????????? ????????? - ????????? ????????? ??????")
    void join2() throws Exception {
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

        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq1)))
                .andExpect(jsonPath("success").value(true))
                .andExpect(status().isCreated())
                .andDo(print());

        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq2)))
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof DuplicateKeyException))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    @DisplayName("???????????? ????????? - ????????? ???????????? ??????")
    void join3() throws Exception {
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
        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq1)))
                .andExpect(status().isCreated())
                .andDo(print());

        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq2)))
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof DuplicateKeyException))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    @DisplayName("???????????? ????????? - ???????????? ??? ???????????? ????????? ?????? ?????? ???????????? ??????")
    void join4() throws Exception {
        UserJoinReq userJoinReq = new UserJoinReq(
                "test1@test.com",
                "1234",
                "test",
                "010-0000-0000"
        );

        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    @DisplayName("???????????? ????????? - ???????????? ??? ????????? ????????? ?????? ?????? ???????????? ??????")
    void join5() throws Exception {
        UserJoinReq userJoinReq = new UserJoinReq(
                "testtest",
                "testPassword",
                "test",
                "010-0000-0000"
        );

        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    @DisplayName("???????????? ????????? - ???????????? ??? ???????????? ????????? ?????? ?????? ???????????? ??????")
    void join6() throws Exception {
        UserJoinReq userJoinReq = new UserJoinReq(
                "test1@test.com",
                "1234",
                "test",
                "01000000000"
        );

        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    @DisplayName("?????? ????????? ?????????")
    void login1() throws Exception {
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(status().isCreated())
                .andDo(print());
        UserLoginReq userLoginReq = new UserLoginReq(email, password);

        mockMvc.perform(post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userLoginReq)))
                .andExpect(jsonPath("success").value(true))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @DisplayName("????????? ?????? ?????????")
    void login2() throws Exception {
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(status().isCreated())
                .andDo(print());
        UserLoginReq userLoginReq = new UserLoginReq(email, password + 1);

        mockMvc.perform(post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userLoginReq)))
                .andExpect(jsonPath("success").value(false))
                .andExpect(status().isBadRequest())
                .andDo(print());
    }

    @Test
    @DisplayName("???????????? ???????????? ?????? ?????????")
    void findPassword1() throws Exception {
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(status().isCreated())
                .andDo(print());
        UserFindPasswordByEmailReq userFindPasswordByEmailReq = new UserFindPasswordByEmailReq(name, email);

        mockMvc.perform(post("/user/find/password/email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userFindPasswordByEmailReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("success").value(true))
                .andDo(print());
    }

    @Test
    @DisplayName("??????????????? ?????????")
    void myPage1() throws Exception {
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(status().isCreated())
                .andDo(print());

        UserLoginReq userLoginReq = new UserLoginReq(email, password);
        MockHttpSession httpSession = new MockHttpSession();
        mockMvc.perform(post("/user/login")
                        .session(httpSession)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userLoginReq)))
                .andExpect(jsonPath("success").value(true))
                .andExpect(status().isOk())
                .andDo(print());

        mockMvc.perform(get("/user/mypage")
                        .session(httpSession))
                .andExpect(jsonPath("email").value(email))
                .andExpect(jsonPath("name").value(name))
                .andExpect(jsonPath("phonenumber").value(phoneNumber))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    @DisplayName("???????????? ?????? ?????????")
    void changePassword() throws Exception {
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(status().isCreated())
                .andDo(print());

        UserLoginReq userLoginReq = new UserLoginReq(email, password);
        MockHttpSession httpSession = new MockHttpSession();
        mockMvc.perform(post("/user/login")
                        .session(httpSession)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userLoginReq)))
                .andExpect(jsonPath("success").value(true))
                .andExpect(status().isOk())
                .andDo(print());


        UserChangePasswordReq userChangePasswordReq = new UserChangePasswordReq("changePassword");
        mockMvc.perform(put("/user/password")
                        .session(httpSession)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userChangePasswordReq)))
                .andExpect(jsonPath("success").value(true))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @Transactional
    @DisplayName("???????????? ?????????")
    void logoutTest() throws Exception {
        String email = "ktykty0722@naver.com";
        String password = "testPassword";
        String name = "taewan";
        String phoneNumber = "010-0000-0000";
        UserJoinReq userJoinReq = new UserJoinReq(
                email,
                password,
                name,
                phoneNumber
        );
        mockMvc.perform(post("/user/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userJoinReq)))
                .andExpect(status().isCreated())
                .andDo(print());

        long id = userRepository.last_insert_id();

        UserLoginReq userLoginReq = new UserLoginReq(email, password);
        MockHttpSession httpSession = new MockHttpSession();

        mockMvc.perform(post("/user/login")
                        .session(httpSession)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userLoginReq)))
                .andExpect(jsonPath("success").value(true))
                .andExpect(status().isOk())
                .andDo(print());

        String requestBody = "{\"token\": \"testtoken\"}";

        mockMvc.perform(post("/fcm/token")
                .session(httpSession)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
        ).andExpect(status().is2xxSuccessful()).andDo(print());

        List<FCMToken> list = tokenRepository.findByUid(id);

        assertEquals(list.size(), 1);

        mockMvc.perform(post("/user/logout")
                .session(httpSession)).andExpect(status().is2xxSuccessful());

        List<FCMToken> list2 = tokenRepository.findByUid(id);

        assertEquals(list2.size(), 0);
    }
}
