package com.amatta.amatta_server.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class UserFindPasswordByEmailReq {

    @NotNull(message = "이름을 입력해주세요.")
    private String name;

    @NotNull(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    public UserFindPasswordByEmailReq() {

    }

    public UserFindPasswordByEmailReq(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
