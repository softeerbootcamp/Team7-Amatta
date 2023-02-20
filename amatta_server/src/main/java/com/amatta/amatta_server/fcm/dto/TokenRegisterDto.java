package com.amatta.amatta_server.fcm.dto;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
public class TokenRegisterDto {
    @NotEmpty
    private String token;

    public TokenRegisterDto(String token) {
        this.token = token;
    }

    public TokenRegisterDto() {

    }
}
