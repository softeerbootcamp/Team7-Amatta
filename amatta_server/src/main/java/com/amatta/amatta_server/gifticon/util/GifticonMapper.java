package com.amatta.amatta_server.gifticon.util;

import com.amatta.amatta_server.gifticon.model.Gifticon;

import java.util.List;

public interface GifticonMapper {
    Gifticon map(List<String> list) throws IndexOutOfBoundsException;
}
