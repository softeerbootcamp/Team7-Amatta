package com.amatta.amatta_server.user.service;

import com.amatta.amatta_server.user.dto.UserJoinReq;
import com.amatta.amatta_server.user.dto.UserJoinRes;
import com.amatta.amatta_server.user.model.Users;
import com.amatta.amatta_server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserJoinRes signUp(UserJoinReq userJoinReq) {
        // TODO : 이메일 중복 처리

        // TODO : 전화번호 중복 처리

        userRepository.addUser(userJoinReq);
        UserJoinRes userJoinRes = new UserJoinRes();
        userJoinRes.setSuccess(true);
        return userJoinRes;
    }


}
