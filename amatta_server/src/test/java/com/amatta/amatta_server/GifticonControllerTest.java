package com.amatta.amatta_server;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


import com.amatta.amatta_server.gifticon.controller.GifticonController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.servlet.http.Cookie;

@SpringBootTest
public class GifticonControllerTest {
    @Autowired
    public GifticonController gifticonController;

    private MockMvc mock;

    @BeforeEach
    public void setup() {
        mock = MockMvcBuilders.standaloneSetup(gifticonController).build();
    }

    @Test
    public void NoCookieRequestExpected4xxResponse() throws Exception {
        mock.perform(post("/gift")).andExpect(status().is4xxClientError());
    }

    @Test
    public void WithCookieRequestExpected2xxResponse() throws Exception {
        mock.perform(post("/gift").cookie(new Cookie("JSESSIONID","SESSION"))).andExpect(status().is2xxSuccessful());
    }
}
