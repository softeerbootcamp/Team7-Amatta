package com.amatta.amatta_server.user.service;

import com.amatta.amatta_server.user.dto.*;
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
        return new UserEmailExistRes(false, mailService.sendJoinEmail(email));
    }

    public UserPhoneNumExistRes checkPhoneNumDuplicated(String phoneNumber) {
        if(Objects.nonNull(userRepository.findByPhoneNum(phoneNumber))) {
            return new UserPhoneNumExistRes(true);
        }
        return new UserPhoneNumExistRes(false);
    }

    public Users login(UserLoginReq userLoginReq) {
        Users users = userRepository.findByEmail(userLoginReq.getEmail());
        if (Objects.nonNull(users) && BCrypt.checkpw(userLoginReq.getPassword(), users.getPassword())) {
            return users;
        }
        return null;
    }

    public UserFindEmailRes findEmail(UserFindEmailReq userFindEmailReq) {
        Users users = userRepository.findByNameAndPhoneNum(userFindEmailReq.getName(), userFindEmailReq.getPhoneNumber());
        if (Objects.nonNull(users)) {
            return new UserFindEmailRes(true, users.getEmail());
        }
        return new UserFindEmailRes(false, "");
    }

    public UserFindPasswordByEmailRes findPasswordByEmail(UserFindPasswordByEmailReq userFindPasswordByEmailReq) {
        Users users = userRepository.findByNameAndEmail(userFindPasswordByEmailReq.getName(), userFindPasswordByEmailReq.getEmail());
        if (Objects.nonNull(users)) {
            userRepository.changePassword(users.getEmail(), BCrypt.hashpw(mailService.sendPasswordFindEmail(users.getEmail()), BCrypt.gensalt()));
            return new UserFindPasswordByEmailRes(true);
        }
        return new UserFindPasswordByEmailRes(false);
    }

    public UserChangePasswordRes changePassword(Users user, UserChangePasswordReq userChangePasswordReq) {
        userRepository.changePassword(user.getEmail(), BCrypt.hashpw(userChangePasswordReq.getPassword(), BCrypt.gensalt()));
        return new UserChangePasswordRes(true);
    }
}
