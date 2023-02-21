package com.amatta.amatta_server.gifticon.util;

import com.amatta.amatta_server.exception.GifticonNotSupportedException;
import com.amatta.amatta_server.gifticon.model.Gifticon;

import java.util.List;

public class NoMatchMapper implements GifticonMapper {
    private static NoMatchMapper instance;

    private NoMatchMapper() {}

    public static GifticonMapper getInstance() {
        if(instance == null) {
            synchronized (KakaoGifticonMapper.class) {
                instance = new NoMatchMapper();
            }
        }
        return instance;
    }
    @Override
    public Gifticon map(List<String> list) throws GifticonNotSupportedException {
        throw new GifticonNotSupportedException();
    }
}
