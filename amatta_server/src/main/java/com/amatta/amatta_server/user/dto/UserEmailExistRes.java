package com.amatta.amatta_server.user.dto;

public class UserEmailExistRes {
    private boolean isExist;
    private String certificationNum;

    public UserEmailExistRes(boolean isExist, String certificationNum) {
        this.isExist = isExist;
        this.certificationNum = certificationNum;
    }

    public boolean isExist() {
        return isExist;
    }

    public String getCertificationNum() {
        return certificationNum;
    }
}
