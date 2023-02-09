package com.amatta.amatta_server;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.amatta.amatta_server.gifticon.controller.GifticonController;
import com.amatta.amatta_server.user.controller.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
public class GifticonControllerTest {
    @Autowired
    public GifticonController gifticonController;

    @Autowired
    public UserController userController;

    private MockMvc gMock;

    private MockMvc uMock;

    @BeforeEach
    public void setup() {
        gMock = MockMvcBuilders.standaloneSetup(gifticonController).build();
        uMock = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void NoCookieRequestExpected4xxResponse() throws Exception {
        gMock.perform(post("/gifticon")).andExpect(status().is4xxClientError());
    }

    @Test
    @Transactional
    public void GifticonAddRequest() throws Exception {
        MockHttpSession session = new MockHttpSession();
        RegisterAndLoginSetup(session);
        String requestBody = "{" +
                "\"itemName\": \"아메리카노\", " +
                "\"brandName\": \"스타벅스\", " +
                "\"image\": \"adfadf\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)).andExpect(status().is2xxSuccessful()).andDo(print());
    }

    @Test
    @Transactional
    public void DuplicateBarcodeGifticonAddRequest() throws Exception {
        MockHttpSession session = new MockHttpSession();
        RegisterAndLoginSetup(session);
        String requestBody = "{" +
                "\"itemName\": \"아메리카노\", " +
                "\"brandName\": \"스타벅스\", " +
                "\"image\": \"adfadf\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody));

        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)).andExpect(status().is4xxClientError()).andDo(print());
    }

    @Test
    @Transactional
    public void BarcodeGifticonAddRequestWithNullAttr() throws Exception {
        MockHttpSession session = new MockHttpSession();
        RegisterAndLoginSetup(session);
        String requestBody = "{" +
                "\"itemName\": \"아메리카노\", " +
                "\"image\": \"adfadf\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody));

        gMock.perform(post("/gifticon")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)).andExpect(status().is4xxClientError()).andDo(print());
    }

    @Test
    @Transactional
    public void GifticonListTest() throws Exception {
        MockHttpSession session = new MockHttpSession();
        RegisterAndLoginSetup(session);
        String requestBody =
                "{" +
                "\"itemName\": \"아메리카노\", " +
                "\"brandName\": \"스타벅스\", " +
                "\"image\": \"adfadf\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234000\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)).andDo(print());

        String requestBody2 =
                "{" +
                        "\"itemName\": \"아메리카노\", " +
                        "\"brandName\": \"스타벅스\", " +
                        "\"image\": \"adfadf\", " +
                        "\"price\": \"3000\", " +
                        "\"barcode\": \"109123124\", " +
                        "\"expiresAtInString\": \"2023/11/11\"" +
                        "}";
        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody2)).andDo(print());

        gMock.perform(get("/gifticon/list")
                        .session(session)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful()).andDo(print());
    }

    private void RegisterAndLoginSetup(MockHttpSession session) throws Exception{
        String joinRequestBody = "{" +
                "\"email\": \"hello123@naver.com\", " +
                "\"password\": \"hello123\", " +
                "\"name\": \"장덕진\", " +
                "\"phoneNumber\": \"010-1111-1111\" " +
                "}";
        uMock.perform(post("/user/join")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(joinRequestBody)).andDo(print());

        String loginRequestBody = "{" +
                "\"email\": \"hello123@naver.com\", " +
                "\"password\": \"hello123\" " +
                "}";
        uMock.perform(post("/user/login")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestBody)).andDo(print());
    }
}
