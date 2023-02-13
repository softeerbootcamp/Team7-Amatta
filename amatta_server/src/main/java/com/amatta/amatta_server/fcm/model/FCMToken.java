package com.amatta.amatta_server.fcm.model;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FCMToken {
    private final long id;
    private final long uid;
    private final String token;

    @Builder
    public FCMToken(long id, long uid, String token) {
        this.id = id;
        this.uid = uid;
        this.token = token;
    }
}
