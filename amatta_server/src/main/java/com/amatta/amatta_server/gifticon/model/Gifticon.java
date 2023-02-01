package com.amatta.amatta_server.gifticon.model;

import java.time.LocalDateTime;

public class Gifticon {

    private long id;
    private long uid;
    private String image;
    private String brandName;
    private String itemName;
    private LocalDateTime expiresAt;
    private LocalDateTime usedAt;
    private int price;

    public long getId() {
        return id;
    }

    public long getUid() {
        return uid;
    }

    public String getImage() {
        return image;
    }

    public String getBrandName() {
        return brandName;
    }

    public String getItemName() {
        return itemName;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public LocalDateTime getUsedAt() {
        return usedAt;
    }

    public int getPrice() {
        return price;
    }
}
