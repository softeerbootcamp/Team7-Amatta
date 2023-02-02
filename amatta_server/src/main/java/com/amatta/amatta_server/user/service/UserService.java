package com.amatta.amatta_server.user.service;

import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.dto.UserJoinRes;
import com.amatta.amatta_server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserJoinRes signUp(UserJoinReq userJoinReq) {

        userRepository.addUser(userJoinReq.getEmail(), userJoinReq.getPassword(), userJoinReq.getName(), userJoinReq.getPhoneNumber());
        UserJoinRes userJoinRes = new UserJoinRes();
        userJoinRes.setSuccess(true);
        return userJoinRes;
    }


    public boolean checkEmailDuplicated(String email) {
        return Objects.nonNull(userRepository.findByEmail(email));
    }

    public boolean checkPhoneNumDuplicated(String phoneNumber) {
        return Objects.nonNull(userRepository.findByPhoneNum(phoneNumber));
    }
}
