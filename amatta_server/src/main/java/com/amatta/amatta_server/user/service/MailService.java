package com.amatta.amatta_server.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Service
public class MailService {

    private final JavaMailSender emailSender;
    private String authNum;

    @Autowired
    public MailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public String sendJoinEmail(String toEmail) {
        MimeMessage emailForm = createJoinEmailForm(toEmail);
        emailSender.send(emailForm);
        return authNum;
    }

    public String sendPasswordFindEmail(String toEmail) {
        MimeMessage emailForm = createPasswordFindEmailForm(toEmail);
        emailSender.send(emailForm);
        return authNum;
    }

    private MimeMessage createJoinEmailForm(String email) {
        try {
            String title = "[Amatta] 회원가입 인증 번호";
            authNum = UUID.randomUUID().toString().substring(0, 6);
            String text =
                    "<div style=\"margin:100px; font-family: verdana\">\n" +
                            "    <h1> 안녕하세요 아마따입니다.</h1><br>\n" +
                            "    <p> 아래 코드를 회원가입 창으로 돌아가 입력해주세요.</p><br>\n" +
                            "    <div align=\"center\" style=\"border:1px solid #92B8B1;\">\n" +
                            "        <h3 style=\"color:#212121\"> 회원가입 인증 코드 입니다. </h3>\n" +
                            "        <div style=\"font-size:130%\">" + authNum + "</div>\n" +
                            "        <br>\n" +
                            "    </div>\n" +
                            "    <br/>\n" +
                            "</div>";

            MimeMessage message = emailSender.createMimeMessage();

            message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
            message.setSubject(title); //제목 설정
            message.setText(text, "utf-8", "html");

            return message;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private MimeMessage createPasswordFindEmailForm(String email) {
        try {
            String title = "[Amatta] 회원가입 인증 번호";
            authNum = UUID.randomUUID().toString().substring(0, 10);
            String text =
                    "<div style=\"margin:100px; font-family: verdana\">\n" +
                            "    <h1> 안녕하세요 아마따입니다.</h1><br>\n" +
                            "    <p> 아래 임시 비밀번호로 로그인 하신 후 비밀번호를 변경해주세요.</p><br>\n" +
                            "    <div align=\"center\" style=\"border:1px solid #92B8B1;\">\n" +
                            "        <h3 style=\"color:#212121\"> 임시 비밀번호 입니다. </h3>\n" +
                            "        <div style=\"font-size:130%\">" + authNum + "</div>\n" +
                            "        <br>\n" +
                            "    </div>\n" +
                            "    <br/>\n" +
                            "</div>";

            MimeMessage message = emailSender.createMimeMessage();

            message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
            message.setSubject(title); //제목 설정
            message.setText(text, "utf-8", "html");

            return message;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
