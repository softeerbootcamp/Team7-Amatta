package com.amatta.amatta_server.gifticon.util;

import com.amatta.amatta_server.exception.GifticonParseException;
import com.amatta.amatta_server.gifticon.model.Gifticon;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class KakaoGifticonMapper implements GifticonMapper {
    private static KakaoGifticonMapper instance;

    private KakaoGifticonMapper() {}

    public static GifticonMapper getInstance() {
        if(instance == null) {
            synchronized (KakaoGifticonMapper.class) {
                instance = new KakaoGifticonMapper();
            }
        }
        return instance;
    }

    @Override
    public Gifticon map(List<String> list) throws GifticonParseException {
        try {
            Date expireDate = Date.valueOf(LocalDate.parse(list.get(list.size() - 3)
                    .replace("유효기간", "").replace(" ", ""), DateTimeFormatter.ofPattern("yyyy년MM월dd일")));
            String brandName = list.get(list.size() - 4).replace("교환처", "");
            String barcode = list.get(list.size() - 5).replace(" ", "");

            StringBuilder stringBuilder = new StringBuilder();
            for (int i = list.size() - 6; !list.get(i).equals(brandName); i--) {
                if (i == 0 && !list.get(i).equals(brandName)) {
                    stringBuilder.delete(0, stringBuilder.toString().length());
                    break;
                }
                stringBuilder.insert(0, list.get(i));
            }

            return Gifticon.builder()
                    .brandname(brandName)
                    .expiresat(expireDate)
                    .itemname(stringBuilder.toString())
                    .barcode(barcode)
                    .build();
        } catch(Exception e) {
            throw new GifticonParseException();
        }
    }
}
