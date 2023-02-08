package com.amatta.amatta_server.gifticon.util;

import com.amatta.amatta_server.gifticon.enums.GifticonMapperEnum;

import java.util.List;

public class GifticonMapperFactory {
    public static GifticonMapper getGifticonMapper(List<String> texts) {
        for(GifticonMapperEnum mapperEnum : GifticonMapperEnum.values()) {
            if(mapperEnum.matches(texts)) {
                return mapperEnum.getGifticonMapper();
            }
        }
        return null;
    }
}
