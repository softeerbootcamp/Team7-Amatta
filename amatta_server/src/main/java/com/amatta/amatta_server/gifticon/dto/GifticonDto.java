package com.amatta.amatta_server.gifticon.dto;

import lombok.Getter;
import javax.validation.constraints.NotEmpty;

@Getter
public class GifticonDto {
    @NotEmpty
    private String itemName;
    @NotEmpty
    private String brandName;
    @NotEmpty
    private String image;
    @NotEmpty
    private String barcode;
    @NotEmpty
    private String expiresAtInString;
    private int price;
}
