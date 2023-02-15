package com.amatta.amatta_server.fcm.service;

import com.amatta.amatta_server.aop.MethodRequiresAuth;
import com.amatta.amatta_server.fcm.dto.TokenRegisterDto;
import com.amatta.amatta_server.fcm.model.FCMToken;
import com.amatta.amatta_server.fcm.repository.DeviceTokenRepository;
import com.amatta.amatta_server.user.model.Users;
import com.google.firebase.messaging.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
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

    public void sendPushNotification(long uid) {
        for(FCMToken token : tokenRepository.findByUid(uid)) {
            Message message = makeExpirationMessage(token);
            try {
                FirebaseMessaging.getInstance().send(message);
            } catch (FirebaseMessagingException e) {
                e.printStackTrace();
            }
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

    public void sendTestMessage(String token) throws FirebaseMessagingException {
        System.out.println(token);
        Message message = Message.builder()
                .setToken(token)
                /*.setNotification(Notification.builder()
                        .setTitle("notification title")
                        .setBody("notification body")
                        .build())*/
                .setWebpushConfig(WebpushConfig.builder()
                        .setNotification(WebpushNotification.builder()
                                .setBody("push body")
                                .setTitle("push title")
                                .setVibrate(new int[]{200, 100, 200, 100, 200, 100, 200})
                                .build())
                        .build())
                .build();
        FirebaseMessaging.getInstance().send(message);
    }

    @Scheduled(cron = "*/10 * * * * *")
    public void sendTestMessageToAllTokens() {
        System.out.println("스케줄러");
        List<FCMToken> list = tokenRepository.findAllTokens();
        for(FCMToken token : list) {
            Message message = Message.builder()
                    .setToken(token.getToken())
                    .setWebpushConfig(WebpushConfig.builder()
                            .setNotification(WebpushNotification.builder()
                                    .setBody("push body")
                                    .setTitle("push title")
                                    .setVibrate(new int[]{200, 100, 200, 100, 200, 100, 200})
                                    .build())
                            .build())
                    .build();
            try {
                FirebaseMessaging.getInstance().send(message);
            } catch (FirebaseMessagingException e) {
                e.printStackTrace();
            }
        }
    }
}
