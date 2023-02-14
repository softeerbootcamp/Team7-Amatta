package com.amatta.amatta_server.fcm.service;

import com.amatta.amatta_server.aop.MethodRequiresAuth;
import com.amatta.amatta_server.fcm.dto.TokenRegisterDto;
import com.amatta.amatta_server.fcm.model.FCMToken;
import com.amatta.amatta_server.fcm.repository.DeviceTokenRepository;
import com.amatta.amatta_server.user.model.Users;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Objects;

@Service
public class FCMService {
    private final DeviceTokenRepository tokenRepository;

    @Autowired
    public FCMService(DeviceTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @MethodRequiresAuth
    public void addToken(TokenRegisterDto tokenRegisterDto) {
        Users user = getUserBySessionId();
        tokenRepository.addToken(user.getId(), tokenRegisterDto.getToken());
    }

    public void sendPushNotification(long uid) throws FirebaseMessagingException {
        for(FCMToken token : tokenRepository.findByUid(uid)) {
            Message message = makeExpirationMessage(token);
            FirebaseMessaging.getInstance().send(message);
        }
    }

    private Message makeExpirationMessage(FCMToken targetToken) {
        return Message.builder()
                .setToken(targetToken.getToken())
                .setNotification(Notification.builder()
                        .setTitle("title")
                        .setBody("body")
                        .build())
                .build();
    }

    private Users getUserBySessionId() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession(false);
        return (Users) session.getAttribute("User");
    }
}
