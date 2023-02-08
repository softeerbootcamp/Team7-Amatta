package com.amatta.amatta_server.gifticon.model;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class Gifticon {

    private long id;
    private long uid;
    private byte[] image;
    private String brandName;
    private String itemName;
    private String barcode;
    private LocalDateTime expiresAt;
    private LocalDateTime usedAt;
    private int price;

    public long getId() {
        return id;
    }

    public long getUid() {
        return uid;
    }

    public byte[] getImage() {
        return image;
    }

    public String getBrandName() {
        return brandName;
    }

    public String getItemName() {
        return itemName;
    }

    public String getBarcode() {
        return barcode;
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
