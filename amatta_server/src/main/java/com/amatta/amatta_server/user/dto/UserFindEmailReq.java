package com.amatta.amatta_server.user.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class UserFindEmailReq {

    @NotNull(message = "이름을 입력해주세요.")
    private String name;

    @NotNull(message = "전화번호 입력해주세요.")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "전화번호 형식에 맞지 않습니다.")
    private String phoneNumber;

    public UserFindEmailReq() {

    }

    public UserFindEmailReq(String name, String phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}
