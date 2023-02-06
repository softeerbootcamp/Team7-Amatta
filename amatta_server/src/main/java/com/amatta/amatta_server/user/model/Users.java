package com.amatta.amatta_server.user.model;

public class Users {
    private long id;
    private String email;
    private String password;
    private String name;
    private String phonenumber;

    public Users(long id, String email, String password, String name, String phonenumber) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phonenumber = phonenumber;
    }

    public long getId() {
        return id;
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
        return phonenumber;
    }

}
