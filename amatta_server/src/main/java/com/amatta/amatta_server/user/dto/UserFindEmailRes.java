package com.amatta.amatta_server.user.dto;

public class UserFindEmailRes {

    private final boolean isSuccess;
    private final String email;

    public UserFindEmailRes(boolean isSuccess, String email) {
        this.isSuccess = isSuccess;
        this.email = email;
    }

    public boolean getSuccess() {
        return isSuccess;
    }

    public String getEmail() {
        return email;
    }
}
