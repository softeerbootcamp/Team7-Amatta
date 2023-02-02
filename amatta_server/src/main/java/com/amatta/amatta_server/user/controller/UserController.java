package com.amatta.amatta_server.user.controller;

import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.dto.UserJoinRes;
import com.amatta.amatta_server.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Objects;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/join/exist/email")
    public ResponseEntity<?> checkEmailDuplicate(@RequestParam String email) {
        boolean check = userService.checkEmailDuplicated(email);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @GetMapping("/join/exist/phoneNum")
    public ResponseEntity<?> checkPhoneNumDuplicate(@RequestParam String phoneNumber) {
        boolean check = userService.checkPhoneNumDuplicated(phoneNumber);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@Valid @RequestBody UserJoinReq userJoinReq) {
        UserJoinRes userJoinRes = userService.signUp(userJoinReq);
        return new ResponseEntity<>(userJoinRes, HttpStatus.CREATED);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<?> duplicateKeyExceptionHandler() {
        return new ResponseEntity<>("중복된 항목이 있습니다.", HttpStatus.BAD_REQUEST);
    }

}
