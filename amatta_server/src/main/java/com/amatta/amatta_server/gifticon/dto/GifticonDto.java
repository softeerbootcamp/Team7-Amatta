package com.amatta.amatta_server.gifticon.dto;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
public class GifticonDto {
    @NotEmpty(message = "상품명을 입력해야 합니다")
    private String itemName;
    @NotEmpty(message = "사용처를 입력해야 합니다")
    private String brandName;
    @NotEmpty(message = "바코드를 입력해야 합니다")
    private String barcode;
    @NotEmpty(message = "만료 날짜를 입력해야 합니다")
    private String expiresAtInString;
    private int price;
}