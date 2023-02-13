package com.amatta.amatta_server.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FCMInitializer {
    /*@Value("${firebase.key}")
    private String firebaseKey;

    @Value("${firebase.projectId}")
    private String projectId;

    @PostConstruct
    private void init() throws IOException {
        InputStream in = new ByteArrayInputStream(firebaseKey.getBytes());

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(in))
                .setProjectId(projectId)
                .build();

        FirebaseApp.initializeApp(options);
    }*/
}
