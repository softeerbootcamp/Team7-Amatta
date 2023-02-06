package com.amatta.amatta_server.user.dto;

public class UserPhoneNumExistRes {
    private final boolean isSuccess;

    public UserPhoneNumExistRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public boolean getSuccess() {
        return isSuccess;
    }

}
