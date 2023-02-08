package com.amatta.amatta_server.user.controller;

import com.amatta.amatta_server.user.dto.*;
import com.amatta.amatta_server.user.model.Users;
import com.amatta.amatta_server.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/join/exist/email")
    public ResponseEntity<?> checkEmailDuplicate(@RequestParam String email) {
        UserEmailExistRes userEmailExistRes = userService.checkEmailDuplicated(email);
        return new ResponseEntity<>(userEmailExistRes, HttpStatus.OK);
    }

    @GetMapping("/join/exist/phoneNum")
    public ResponseEntity<?> checkPhoneNumDuplicate(@RequestParam String phoneNumber) {
        UserPhoneNumExistRes userPhoneNumExistRes = userService.checkPhoneNumDuplicated(phoneNumber);
        return new ResponseEntity<>(userPhoneNumExistRes, HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@Valid @RequestBody UserJoinReq userJoinReq) {
        UserJoinRes userJoinRes = userService.signUp(userJoinReq);
        return new ResponseEntity<>(userJoinRes, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginReq userLoginReq, HttpServletRequest httpServletRequest) {
        Users loginUser = userService.login(userLoginReq);
        if (Objects.isNull(loginUser)) {
            return new ResponseEntity<>(new UserLoginRes(false), HttpStatus.BAD_REQUEST);
        }

        HttpSession httpSession = httpServletRequest.getSession(true);
        httpSession.setAttribute("User", loginUser);
        return new ResponseEntity<>(new UserLoginRes(true), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return new ResponseEntity<>(new UserLogoutRes(true), HttpStatus.OK);
    }

    @PostMapping("/find/email")
    public ResponseEntity<?> findEmail(@RequestBody UserFindEmailReq userFindEmailReq) {
        UserFindEmailRes userFindEmailRes = userService.findEmail(userFindEmailReq);
        return new ResponseEntity<>(userFindEmailRes, HttpStatus.OK);
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
