package com.amatta.amatta_server.user.dto;

public class UserChangePasswordRes {

    private final boolean isSuccess;

    public UserChangePasswordRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public boolean isSuccess() {
        return isSuccess;
    }
}
