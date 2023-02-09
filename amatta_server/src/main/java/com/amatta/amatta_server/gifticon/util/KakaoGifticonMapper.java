package com.amatta.amatta_server.gifticon.util;

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
    public Gifticon map(List<String> list) throws IndexOutOfBoundsException {
        int brandNameIndex = list.lastIndexOf("교환처");
        int expirationDateIndex = list.lastIndexOf("유효기간");
        int orderIdIndex = list.lastIndexOf("주문번호");

        String brandName = list.get(brandNameIndex+1);
        String itemName = getItemName(list, brandName);
        String barcode = getBarcode(list, brandNameIndex);

        java.sql.Date expiretionDate = Date.valueOf(getExpirationDate(list, expirationDateIndex, orderIdIndex));

        return Gifticon.builder()
                .brandname(brandName)
                .expiresat(expiretionDate)
                .itemname(itemName)
                .barcode(barcode)
                .build();
    }

    private String getBarcode(List<String> list, int brandNameIndex) {
        int barcodeStartIdx = 0;
        for(int i = brandNameIndex - 1; i >= 0; i--) {
            if(list.get(i).matches("^\\d{4}$")) {
                barcodeStartIdx = i;
            }
            if(!list.get(i).matches("^\\d{4}$")) {
                break;
            }
        }

        StringBuilder st = new StringBuilder();
        for(int i = barcodeStartIdx; i < brandNameIndex; i++) {
            st.append(list.get(i));
        }
        return st.toString();
    }

    private LocalDate getExpirationDate(List<String> list, int expirationDateIndex, int orderIdIndex) throws IndexOutOfBoundsException {
        StringBuilder expirationDate = new StringBuilder();
        for(String date : list.subList(expirationDateIndex+1, orderIdIndex)) {
            expirationDate.append(date);
        }

        return LocalDate.parse(expirationDate.toString(), DateTimeFormatter.ofPattern("yyyy년MM월dd일"));
    }

    private String getItemName(List<String> list, String brandName) throws IndexOutOfBoundsException {
        int itemNameStartIndex = list.indexOf(brandName) + 1;
        int itemNameEndIndex = 0;
        for(int i = list.lastIndexOf(brandName) - 2; i >= 0; i--) {
            if(!list.get(i).matches("^\\d{4}$")) {
                itemNameEndIndex = i+1;
                break;
            }
        }
        StringBuilder itemName = new StringBuilder();
        for(String name : list.subList(itemNameStartIndex, itemNameEndIndex)) {
            itemName.append(name).append(" ");
        }

        return itemName.toString().trim();
    }
}
