package com.amatta.amatta_server.gifticon.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class GifticonDeleteDto {
    @NotNull(message = "사용할 기프티콘의 아이디가 필요합니다")
    private long gifticonId;
}
