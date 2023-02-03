package com.amatta.amatta_server.gifticon.controller;

import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.service.GifticonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GifticonController {
    private final GifticonService gifticonService;

    @Autowired
    public GifticonController(GifticonService gifticonService) {
        this.gifticonService = gifticonService;
    }

    @PostMapping("/gift")
    public ResponseEntity<?> gifticonAdd() {
        List<Gifticon> gifticonList = gifticonService.findGifticonList();
        return new ResponseEntity<>(gifticonList, HttpStatus.OK);
    }

    @ExceptionHandler(NotAuthenticatedException.class)
    public ResponseEntity<?> notAuthenticatedExceptionHandler() {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
