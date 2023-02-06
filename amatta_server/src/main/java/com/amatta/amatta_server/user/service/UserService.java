package com.amatta.amatta_server.user.service;

import com.amatta.amatta_server.user.dto.UserEmailExistRes;
import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.dto.UserJoinRes;
import com.amatta.amatta_server.user.dto.UserLoginReq;
import com.amatta.amatta_server.user.model.Users;
import com.amatta.amatta_server.user.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final MailService mailService;

    public UserService(UserRepository userRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    public UserJoinRes signUp(UserJoinReq userJoinReq) {
        userRepository.addUser(userJoinReq.getEmail(), BCrypt.hashpw(userJoinReq.getPassword(), BCrypt.gensalt()), userJoinReq.getName(), userJoinReq.getPhoneNumber());
        UserJoinRes userJoinRes = new UserJoinRes();
        userJoinRes.setSuccess(true);
        return userJoinRes;
    }

    public UserEmailExistRes checkEmailDuplicated(String email) {
        if(Objects.nonNull(userRepository.findByEmail(email))) {
            return new UserEmailExistRes(true, "");
        }
        return new UserEmailExistRes(false, mailService.sendEmail(email));
    }

    public boolean checkPhoneNumDuplicated(String phoneNumber) {
        return Objects.nonNull(userRepository.findByPhoneNum(phoneNumber));
    }

    public Users login(UserLoginReq userLoginReq) {
        Users users = userRepository.findByEmail(userLoginReq.getEmail());
        if(Objects.nonNull(users) && BCrypt.checkpw(userLoginReq.getPassword(), users.getPassword())) {
            return users;
        }
        return null;
    }
}
