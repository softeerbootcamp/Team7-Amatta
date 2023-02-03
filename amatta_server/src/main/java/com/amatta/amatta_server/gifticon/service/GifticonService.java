package com.amatta.amatta_server.gifticon.service;

import com.amatta.amatta_server.aop.ClassRequiresAuth;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@ClassRequiresAuth
public class GifticonService {
    public List<Gifticon> findGifticonList() {
        return null;
    }
}
