package com.amatta.amatta_server.gifticon.controller;

import com.amatta.amatta_server.exception.DuplicateGifticonException;
import com.amatta.amatta_server.exception.GifticonNotSupportedException;
import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.gifticon.dto.GifticonDto;
import com.amatta.amatta_server.gifticon.dto.GifticonImageDto;
import com.amatta.amatta_server.gifticon.dto.GifticonTextDto;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.service.GifticonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://15.164.13.149:5173/", allowCredentials = "true")
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
    public ResponseEntity<?> gifticonAdd(@Valid @RequestBody GifticonDto dto) {
        gifticonService.addGifticon(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/{uid}")
    public ResponseEntity<?> gifticonList(@PathVariable Long uid) {
        return new ResponseEntity<>(gifticonService.findGifticons(uid), HttpStatus.OK);
    }

    @ExceptionHandler(NotAuthenticatedException.class)
    public ResponseEntity<?> notAuthenticatedExceptionHandler() {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(GifticonNotSupportedException.class)
    public ResponseEntity<?> gifticonNotSupportedExceptionHandler() {
        return new ResponseEntity<>("지원하지 않는 기프티콘", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IndexOutOfBoundsException.class)
    public ResponseEntity<?> indexOutOfBoundExceptionHandler() {
        return new ResponseEntity<>("잘못된 형식의 이미지", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateGifticonException.class)
    public ResponseEntity<?> duplicateGifticonExceptionHandler() {
        return new ResponseEntity<>("중복되는 바코드를 가진 기프티콘이 존재", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidExceptionHandler() {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
