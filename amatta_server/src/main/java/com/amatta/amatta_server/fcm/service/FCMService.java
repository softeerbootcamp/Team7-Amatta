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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
                        .setFcmOptions(WebpushFcmOptions.builder()
                                .setLink("https://amatta.site/card")
                                .build())
                        .setNotification(WebpushNotification.builder()
                                .setTitle(title)
                                .setBody(body)
                                .setIcon("https://amatta-icons.s3.ap-northeast-2.amazonaws.com/logo/logo-pink.png")
                                .setBadge("https://amatta-icons.s3.ap-northeast-2.amazonaws.com/logo/logo-pink.png")
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

    @Scheduled(cron = "0 0 0/1 * * *")
    @Transactional(readOnly = true)
    public void scheduleExpirationAlarmMessage() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println(now + "   [스케줄러 실행]");
//        List<String> tokens = tokenRepository.findTokensByUidsOfGifticonsAboutToExpire(now.plusDays(Gifticon.expirationThresholdDays));
        List<FCMToken> tokens = tokenRepository.findAllTokens();
        if (!tokens.isEmpty()) {
            for(FCMToken token : tokens) {
                try {
                    sendMessage(token.getToken(), "A! matta", "만료 기간이 얼마 남지 않은 기프티콘이 있습니다!!");
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private Users getUserBySessionId() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession(false);
        return (Users) session.getAttribute("User");
    }
}
