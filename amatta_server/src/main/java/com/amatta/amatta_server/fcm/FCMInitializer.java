package com.amatta.amatta_server.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FCMInitializer {
    @Value("${firebase.key.path}")
    private String firebaseKeyPath;

    @Value("${firebase.projectId}")
    private String projectId;

    @PostConstruct
    private void init() throws IOException {
        FileInputStream refreshToken = new FileInputStream(firebaseKeyPath);

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(refreshToken))
                .setProjectId(projectId)
                .build();

        FirebaseApp.initializeApp(options);
    }
}
