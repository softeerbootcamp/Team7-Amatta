package com.amatta.amatta_server.user.dto;

import javax.validation.constraints.NotNull;

public class UserLoginReq {

    @NotNull(message = "이메일을 입력해주세요.")
    private String email;

    @NotNull(message = "비밀번호를 입력해주세요.")
    private String password;

    public UserLoginReq() {

    }

    public UserLoginReq(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
