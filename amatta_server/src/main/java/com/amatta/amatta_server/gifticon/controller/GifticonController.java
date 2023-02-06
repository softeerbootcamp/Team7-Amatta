package com.amatta.amatta_server.gifticon.controller;

import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.gifticon.dto.GifticonImageDto;
import com.amatta.amatta_server.gifticon.dto.GifticonTextDto;
import com.amatta.amatta_server.gifticon.service.GifticonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gifticon")
@CrossOrigin
public class GifticonController {
    private final GifticonService gifticonService;

    @Autowired
    public GifticonController(GifticonService gifticonService) {
        this.gifticonService = gifticonService;
    }

    @PostMapping("/text")
    public ResponseEntity<?> gifticonTextExtract(@RequestBody GifticonImageDto dto) {
        return gifticonService.extractGifticonText(dto);
    }

    @PostMapping("")
    public ResponseEntity<?> gifticonAdd(@RequestBody GifticonTextDto dto) {
        System.out.println(dto.getTexts());
        return null;
        //List<Gifticon> gifticonList = gifticonService.findGifticonList();
        //return new ResponseEntity<>(gifticonList, HttpStatus.OK);
    }

    @ExceptionHandler(NotAuthenticatedException.class)
    public ResponseEntity<?> notAuthenticatedExceptionHandler() {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
