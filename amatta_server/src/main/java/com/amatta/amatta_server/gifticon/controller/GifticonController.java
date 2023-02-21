package com.amatta.amatta_server.gifticon.controller;

import com.amatta.amatta_server.exception.DuplicateGifticonException;
import com.amatta.amatta_server.exception.GifticonNotSupportedException;
import com.amatta.amatta_server.exception.GifticonParseException;
import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.fcm.service.FCMService;
import com.amatta.amatta_server.gifticon.dto.GifticonUseDto;
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
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@CrossOrigin(origins = {"https://amatta.site", "http://localhost:5173"}, allowCredentials = "true")
@RequestMapping("/gifticon")
public class GifticonController {
    private final GifticonService gifticonService;

    private final FCMService fcmService;

    @Autowired
    public GifticonController(GifticonService gifticonService, FCMService fcmService) {
        this.gifticonService = gifticonService;
        this.fcmService = fcmService;
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
    public ResponseEntity<?> gifticonAdd(@Valid @RequestPart GifticonDto dto,
                                         @RequestPart MultipartFile image, @RequestPart MultipartFile thumbnail) throws IOException {
        gifticonService.addGifticon(dto, image, thumbnail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> gifticonList(@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword) {
        return new ResponseEntity<>(gifticonService.findGifticons(keyword), HttpStatus.OK);
    }

    @GetMapping("/used")
    public ResponseEntity<?> usedGifticonList() {
        return new ResponseEntity<>(gifticonService.usedTest(), HttpStatus.OK);
    }

    @PutMapping("/used")
    public ResponseEntity<?> useGifticon(@RequestBody GifticonUseDto dto) {
        gifticonService.useGifticon(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(NotAuthenticatedException.class)
    public ResponseEntity<?> notAuthenticatedExceptionHandler() {
        return new ResponseEntity<>(NotAuthenticatedException.message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(GifticonNotSupportedException.class)
    public ResponseEntity<?> gifticonNotSupportedExceptionHandler() {
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @ExceptionHandler(GifticonParseException.class)
    public ResponseEntity<?> gifticonParseExceptionHandler() {
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @ExceptionHandler(DuplicateGifticonException.class)
    public ResponseEntity<?> duplicateGifticonExceptionHandler() {
        return new ResponseEntity<>(DuplicateGifticonException.message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> illegalArgumentExceptionHandler(IllegalArgumentException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword) {
        return new ResponseEntity<>(gifticonService.test(keyword), HttpStatus.OK);
    }
}