package com.amatta.amatta_server.fcm.service;

import com.amatta.amatta_server.aop.MethodRequiresAuth;
import com.amatta.amatta_server.fcm.dto.TokenRegisterDto;
import com.amatta.amatta_server.fcm.repository.DeviceTokenRepository;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.user.model.Users;
import com.google.firebase.messaging.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.ArrayList;
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

    private void sendMessage(List<String> tokens, String title, String body) throws FirebaseMessagingException {
        List<Message> messages = new ArrayList<>();
        for(String token : tokens) {
            messages.add(generateMessages(token, title, body));
        }
        FirebaseMessaging.getInstance().sendAll(messages);
    }

    private void sendMessage(String tokens, String title, String body) throws FirebaseMessagingException {
        Message messages = generateMessages(tokens, title, body);
        FirebaseMessaging.getInstance().send(messages);
    }

    private Message generateMessages(String token, String title, String body) {
        return Message.builder()
                .setToken(token)
                .setWebpushConfig(WebpushConfig.builder()
                        .setNotification(WebpushNotification.builder()
                                .setTitle(title)
                                .setBody(body)
                                .setIcon("icon")
                                .setVibrate(new int[]{200, 100, 200, 100, 200, 100, 200})
                                .build())
                        .build())
                .build();
    }

    public void sendTestMessage(String token) throws FirebaseMessagingException {
        System.out.println(token);
        Message message = Message.builder()
                .setToken(token)
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

    @Scheduled(cron = "*/20 * * * * *")
    @Transactional(readOnly = true)
    public void scheduleExpirationAlarmMessage() {
        System.out.println("expire");
        LocalDate now = LocalDate.now();
        List<String> tokens = tokenRepository.findTokensByUidsOfGifticonsAboutToExpire(now.plusDays(Gifticon.expirationThresholdDays));
        if (!tokens.isEmpty()){
            try {
                sendMessage(tokens, "A! matta", "거의 만료된 기프티콘이 있어요");
            } catch (FirebaseMessagingException e) {
                e.printStackTrace();
            }
        }
    }

    private Users getUserBySessionId() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession(false);
        return (Users) session.getAttribute("User");
    }
}
