package com.amatta.amatta_server.user.dto;

public class UserPhoneNumExistRes {
    private final boolean isExist;

    public UserPhoneNumExistRes(boolean isExist) {
        this.isExist = isExist;
    }

    public boolean isExist() {
        return isExist;
    }

}
