package com.amatta.amatta_server.gifticon.controller;

import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.gifticon.dto.GifticonImageDto;
import com.amatta.amatta_server.gifticon.dto.GifticonTextDto;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.service.GifticonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/gifticon")
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

    @PostMapping("/map")
    public ResponseEntity<Gifticon> gifticonTextMap(@RequestBody GifticonTextDto dto) {
        Gifticon gifticon = gifticonService.mapTextToGifticon(dto);
        return new ResponseEntity<>(gifticon, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> gifticonAdd(@RequestBody GifticonTextDto dto) {
        //System.out.println(dto.getTexts());
        return null;
        //List<Gifticon> gifticonList = gifticonService.findGifticonList();
        //return new ResponseEntity<>(gifticonList, HttpStatus.OK);
    }

    @ExceptionHandler(NotAuthenticatedException.class)
    public ResponseEntity<?> notAuthenticatedExceptionHandler() {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<?> nullPointerExceptionHandler() {
        return new ResponseEntity<>("지원하지 않는 기프티콘", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IndexOutOfBoundsException.class)
    public ResponseEntity<?> indexOutOfBoundExceptionHandler() {
        return new ResponseEntity<>("잘못된 형식의 이미지", HttpStatus.BAD_REQUEST);
    }
}
