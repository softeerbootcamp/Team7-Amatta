package com.amatta.amatta_server.index;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "https://amatta.site, http://localhost:5173", allowCredentials = "true")
public class IndexController {
    @GetMapping("/cookie")
    public ResponseEntity<?> redirect(HttpServletRequest httpServletRequest) {
        HttpSession httpSession = httpServletRequest.getSession(true);
        httpSession.setAttribute("Cookie", "cookie");
        return new ResponseEntity<>("쿠키 생성", HttpStatus.OK);
    }
}
