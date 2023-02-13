package com.amatta.amatta_server.exception;

public class NotAuthenticatedException extends RuntimeException {
    public static final String message = "로그인이 필요합니다";
}
