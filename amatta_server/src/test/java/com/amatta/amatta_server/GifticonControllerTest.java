package com.amatta.amatta_server;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.amatta.amatta_server.gifticon.controller.GifticonController;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.repository.GifticonRepository;
import com.amatta.amatta_server.user.controller.UserController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@SpringBootTest
public class GifticonControllerTest {
    @Autowired
    public GifticonController gifticonController;

    @Autowired
    public UserController userController;

    @Autowired
    public GifticonRepository gifticonRepository;

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
    public void InvalidSessionRequestExpected401Response() throws Exception {
        MockHttpSession session = new MockHttpSession();
        RegisterAndLoginSetup(session);
        session.invalidate();
        String requestBody = "{" +
                "\"itemName\": \"아메리카노\", " +
                "\"brandName\": \"스타벅스\", " +
                "\"image\": \"adfadf\", " +
                "\"thumbnail\": \"adfadfa\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)).andExpect(status().isUnauthorized()).andDo(print());
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
                "\"thumbnail\": \"adfadfa\", " +
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
                "\"thumbnail\": \"adfadfa\", " +
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
                "\"thumbnail\": \"adfadfa\", " +
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
                "\"thumbnail\": \"adfadfa\", " +
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
                        "\"thumbnail\": \"adfadfa\", " +
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

    @Test
    @Transactional
    public void GifticonUseTest() throws Exception {
        MockHttpSession session = new MockHttpSession();
        RegisterAndLoginSetup(session);
        String requestBody =
                "{" +
                        "\"itemName\": \"아메리카노\", " +
                        "\"brandName\": \"스타벅스\", " +
                        "\"image\": \"adfadf\", " +
                        "\"thumbnail\": \"adfadfa\", " +
                        "\"price\": \"3000\", " +
                        "\"barcode\": \"12341234000\", " +
                        "\"expiresAtInString\": \"2023/11/11\"" +
                        "}";
        gMock.perform(post("/gifticon")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)).andDo(print());

        long id = gifticonRepository.findLastInsertId();

        Gifticon gifticonBefore = gifticonRepository.findById(id).orElse(null);
        if(gifticonBefore == null) {
            Assertions.fail();
        }
        if(gifticonBefore.getUsedAt().before(java.sql.Date.valueOf(LocalDate.now()))) {
            Assertions.fail();
        }

        gMock.perform(put("/gifticon/used")
                .session(session)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)).andExpect(status().is2xxSuccessful()).andDo(print());

        Gifticon gifticonAfter = gifticonRepository.findById(id).orElse(null);
        if(gifticonAfter == null) {
            Assertions.fail();
        }
        if(gifticonAfter.getUsedAt().after(java.sql.Date.valueOf(LocalDate.now()))) {
            Assertions.fail();
        }
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
