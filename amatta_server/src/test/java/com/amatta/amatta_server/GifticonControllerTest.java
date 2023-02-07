package com.amatta.amatta_server;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


import com.amatta.amatta_server.gifticon.controller.GifticonController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;

@SpringBootTest
public class GifticonControllerTest {
    @Autowired
    public GifticonController gifticonController;

    @Autowired
    public ObjectMapper objectMapper;

    private MockMvc mock;

    @BeforeEach
    public void setup() {
        mock = MockMvcBuilders.standaloneSetup(gifticonController).build();
    }

    @Test
    public void NoCookieRequestExpected4xxResponse() throws Exception {
        mock.perform(post("/gifticon")).andExpect(status().is4xxClientError());
    }

    @Test
    public void WithCookieRequestExpected2xxResponse() throws Exception {
        mock.perform(post("/gifticon").cookie(new Cookie("JSESSIONID","SESSION"))).andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    public void GifticonAddRequest() throws Exception {
        String requestBody = "{" +
                "\"uid\": \"1\", " +
                "\"itemName\": \"아메리카노\", " +
                "\"brandName\": \"스타벅스\", " +
                "\"image\": \"adfadf\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        mock.perform(post("/gifticon")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(new Cookie("JSESSIONID", "hello"))
                .content(requestBody)).andExpect(status().is2xxSuccessful());
    }

    @Test
    @Transactional
    public void DuplicateBarcodeGifticonAddRequest() throws Exception {
        String requestBody = "{" +
                "\"uid\": \"1\", " +
                "\"itemName\": \"아메리카노\", " +
                "\"brandName\": \"스타벅스\", " +
                "\"image\": \"adfadf\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        mock.perform(post("/gifticon")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(new Cookie("JSESSIONID", "hello"))
                .content(requestBody));

        mock.perform(post("/gifticon")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(new Cookie("JSESSIONID", "hello"))
                .content(requestBody)).andExpect(status().is4xxClientError()).andDo(print());
    }

    @Test
    @Transactional
    public void BarcodeGifticonAddRequestWithNullAttr() throws Exception {
        String requestBody = "{" +
                "\"uid\": \"1\", " +
                "\"itemName\": \"아메리카노\", " +
                "\"image\": \"adfadf\", " +
                "\"price\": \"3000\", " +
                "\"barcode\": \"12341234\", " +
                "\"expiresAtInString\": \"2023/11/11\"" +
                "}";
        mock.perform(post("/gifticon")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(new Cookie("JSESSIONID", "hello"))
                .content(requestBody));

        mock.perform(post("/gifticon")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(new Cookie("JSESSIONID", "hello"))
                .content(requestBody)).andExpect(status().is4xxClientError()).andDo(print());
    }
}
