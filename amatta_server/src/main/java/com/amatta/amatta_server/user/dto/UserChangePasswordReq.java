package com.amatta.amatta_server.user.dto;

import javax.validation.constraints.NotNull;

public class UserChangePasswordReq {
    @NotNull(message = "비밀번호를 입력해주세요.")
    private String password;

    public UserChangePasswordReq(String password) {
        this.password = password;
    }

    public UserChangePasswordReq() {
    }

    public String getPassword() {
        return password;
    }
}
