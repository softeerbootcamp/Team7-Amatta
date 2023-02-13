package com.amatta.amatta_server;

import com.amatta.amatta_server.fcm.controller.FCMController;
import com.amatta.amatta_server.fcm.model.FCMToken;
import com.amatta.amatta_server.fcm.repository.DeviceTokenRepository;
import com.amatta.amatta_server.user.controller.UserController;
import com.amatta.amatta_server.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class FCMRepoTest {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeviceTokenRepository deviceTokenRepository;

    @Autowired
    public UserController userController;

    @Autowired
    public FCMController fcmController;

    private MockMvc uMock;

    private MockMvc tMock;

    @BeforeEach
    public void setup() {
        uMock = MockMvcBuilders.standaloneSetup(userController).build();
        tMock = MockMvcBuilders.standaloneSetup(fcmController).build();
    }

    @Test
    @Transactional
    public void GetTokenTest() throws Exception {
        MockHttpSession session = new MockHttpSession();
        RegisterAndLoginSetup(session);
        long uid = userRepository.last_insert_id();

        String requestBody = "\"token\": \"tokentokentoken\"";
        tMock.perform(MockMvcRequestBuilders.post("/fcm")
                .session(session)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(requestBody)
                ).andExpect(status().is2xxSuccessful());
        List<FCMToken> list = deviceTokenRepository.findByUid(uid);
        assertThat(list.size()).isNotEqualTo(0);
    }

    private void RegisterAndLoginSetup(MockHttpSession session) throws Exception{
        String joinRequestBody = "{" +
                "\"email\": \"hello123@naver.com\", " +
                "\"password\": \"hello123\", " +
                "\"name\": \"장덕진\", " +
                "\"phoneNumber\": \"010-1111-1111\" " +
                "}";
        uMock.perform(MockMvcRequestBuilders.post("/user/join")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(joinRequestBody)).andDo(print());

        String loginRequestBody = "{" +
                "\"email\": \"hello123@naver.com\", " +
                "\"password\": \"hello123\" " +
                "}";
        uMock.perform(MockMvcRequestBuilders.post("/user/login")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestBody)).andDo(print());
    }
}
