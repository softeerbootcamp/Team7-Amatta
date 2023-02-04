package com.amatta.amatta_server.gifticon.util;

import com.amatta.amatta_server.gifticon.dto.GifticonImageDto;
import org.springframework.http.HttpEntity;

public interface RequestGenerator {
    HttpEntity<?> generate(GifticonImageDto dto);

    String getUrl();
}
