package com.amatta.amatta_server.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FCMInitializer {
    @Value("${firebase.key.path}")
    private String firebaseKeyPath;

    @Value("${firebase.projectId}")
    private String projectId;

    @PostConstruct
    private void init() throws IOException {
        InputStream resourceStream = getClass().getResourceAsStream("/team7-amatta-firebase-adminsdk-pa4f5-612a44bb30.json");
        Path targetPath = Paths.get("team7-amatta-firebase-adminsdk-pa4f5-612a44bb30.json");
        Files.copy(resourceStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        FileInputStream refreshToken = new FileInputStream(targetPath.toString());
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(refreshToken))
                .setProjectId(projectId)
                .build();

        FirebaseApp.initializeApp(options);
    }
}
