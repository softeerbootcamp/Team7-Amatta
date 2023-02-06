package com.amatta.amatta_server.gifticon.util;

import com.amatta.amatta_server.gifticon.dto.GifticonImageDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class NaverAPIRequestGenerator implements RequestGenerator{
    @Value("${naver.ocr.gateway}")
    private String URL;

    @Value("${naver.ocr.x-ocr-secret}")
    private String X_OCR_SECRET;

    @Override
    public HttpEntity<String> generate(GifticonImageDto dto) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("X-OCR-SECRET", X_OCR_SECRET);

        String requestBody = "{\n" +
                "  \"version\": \"V2\",\n" +
                "  \"requestId\": \"string\",\n" +
                "  \"timestamp\": 0,\n" +
                "  \"lang\":\"ko\",\n" +
                "  \"images\": [\n" +
                "    {\n" +
                "      \"format\": \"" + dto.getFormat() + "\",\n" +
                "      \"name\": \"gifticon\",\n" +
                "      \"data\": \"" + dto.getGifticonBase64() + "\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        return request;
    }

    public String getUrl() {
        return URL;
    }
}
