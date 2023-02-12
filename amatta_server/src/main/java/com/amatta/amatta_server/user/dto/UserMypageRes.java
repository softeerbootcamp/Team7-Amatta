package com.amatta.amatta_server.user.dto;

public class UserMypageRes {

    private boolean isSuccess;
    private String email = "";
    private String password = "";
    private String name = "";
    private String phonenumber = "";

    public UserMypageRes(boolean isSuccess, String email, String password, String name, String phonenumber) {
        this.isSuccess = isSuccess;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phonenumber = phonenumber;
    }

    public UserMypageRes(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public UserMypageRes() {
    }

    public boolean isSuccess() {
        return isSuccess;
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

    public String getPhonenumber() {
        return phonenumber;
    }
}
