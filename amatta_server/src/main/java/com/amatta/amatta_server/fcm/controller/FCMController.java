package com.amatta.amatta_server.fcm.controller;

import com.amatta.amatta_server.fcm.dto.TokenRegisterDto;
import com.amatta.amatta_server.fcm.service.FCMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "https://amatta.site", allowCredentials = "true")
@RequestMapping("/fcm")
public class FCMController {
    private final FCMService fcmService;

    @Autowired
    public FCMController(FCMService fcmService) {
        this.fcmService = fcmService;
    }

    /*@PostMapping("")
    public ResponseEntity<?> addDeviceToken(@RequestBody TokenRegisterDto dto) {
        fcmService.addToken(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }*/
}
