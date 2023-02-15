package com.amatta.amatta_server.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@Service
public class FCMInitializer {
    @Value("${firebase.key.path}")
    private String firebaseKeyPath;

    @Value("${firebase.projectId}")
    private String projectId;

    @PostConstruct
    private void init() throws IOException {
        InputStream resourceStream = Objects.requireNonNull(getClass().getResourceAsStream(firebaseKeyPath));
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(resourceStream))
                .setProjectId(projectId)
                .build();

        FirebaseApp.initializeApp(options);
    }
}
