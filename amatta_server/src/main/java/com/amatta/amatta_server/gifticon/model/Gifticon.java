package com.amatta.amatta_server.gifticon.model;

import lombok.Builder;

import java.sql.Date;

@Builder
public class Gifticon {

    private long id;
    private long uid;
    private byte[] image;
    private String brandname;
    private String itemname;
    private String barcode;
    private Date expiresat;
    private Date usedat;
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
        return brandname;
    }

    public String getItemName() {
        return itemname;
    }

    public String getBarcode() {
        return barcode;
    }

    public Date getExpiresAt() {
        return expiresat;
    }

    public Date getUsedAt() {
        return usedat;
    }

    public int getPrice() {
        return price;
    }
}
