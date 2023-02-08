package com.amatta.amatta_server.user.dto;

public class UserFindPasswordByEmailRes {

    private final boolean isSuccess;

    public UserFindPasswordByEmailRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public boolean getSuccess() {
        return isSuccess;
    }

}
