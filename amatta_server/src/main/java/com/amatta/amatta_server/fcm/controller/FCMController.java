package com.amatta.amatta_server.fcm.controller;

import com.amatta.amatta_server.fcm.dto.TokenRegisterDto;
import com.amatta.amatta_server.fcm.service.FCMService;
import com.google.firebase.messaging.FirebaseMessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"https://amatta.site", "http://localhost:5173"}, allowCredentials = "true")
@RequestMapping("/fcm")
public class FCMController {
    private final FCMService fcmService;

    @Autowired
    public FCMController(FCMService fcmService) {
        this.fcmService = fcmService;
    }

    @PostMapping("/token")
    public ResponseEntity<?> addDeviceToken(@RequestBody TokenRegisterDto dto) {
        fcmService.addToken(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/message")
    public ResponseEntity<?> sendTestMessage(@RequestParam("token") String token) {
        try {
            fcmService.sendTestMessage(token);
        } catch (FirebaseMessagingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
