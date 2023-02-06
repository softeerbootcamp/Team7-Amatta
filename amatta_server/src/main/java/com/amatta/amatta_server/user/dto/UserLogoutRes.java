package com.amatta.amatta_server.user.dto;

public class UserLogoutRes {
    private final boolean isSuccess;

    public UserLogoutRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public boolean getSuccess() {
        return isSuccess;
    }
}
