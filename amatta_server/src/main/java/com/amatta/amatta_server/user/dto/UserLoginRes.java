package com.amatta.amatta_server.user.dto;

public class UserLoginRes {
    private final boolean isSuccess;

    public UserLoginRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public boolean getSuccess() {
        return isSuccess;
    }

}
