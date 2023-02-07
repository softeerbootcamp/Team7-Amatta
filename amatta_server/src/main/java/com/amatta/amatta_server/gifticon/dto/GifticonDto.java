package com.amatta.amatta_server.gifticon.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GifticonDto {
    private String ItemName;
    private String brandName;
    private byte[] image;
    private String barcode;
    private String expiresAtString;
    private int price;
}
