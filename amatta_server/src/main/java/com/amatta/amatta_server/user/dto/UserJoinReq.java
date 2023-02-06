package com.amatta.amatta_server.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class UserJoinReq {

    @NotNull(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    @NotNull(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp = "^[A-Za-z0-9]{6,15}$", message = "비밀번호는 숫자, 문자 포함 6자리에서 15자리 사이여야 합니다.")
    private String password;

    @NotNull(message = "이름을 입력해주세요.")
    private String name;

    @NotNull(message = "전화번호 입력해주세요.")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "전화번호 형식에 맞지 않습니다.")
    private String phoneNumber;

    public UserJoinReq() {

    }

    public UserJoinReq(String email, String password, String name, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }


}
