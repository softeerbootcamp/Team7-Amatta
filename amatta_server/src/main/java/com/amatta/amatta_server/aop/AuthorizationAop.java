package com.amatta.amatta_server.aop;

import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.user.model.Users;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Objects;

@Component
@Aspect
public class AuthorizationAop {
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationAop.class);

    @Before("within(@com.amatta.amatta_server.aop.ClassRequiresAuth *)")
    public void authorizeClass() throws NotAuthenticatedException, NullPointerException {
        logger.info("AuthorizationAop.authorize");

        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession(false);

        Users user = (Users) session.getAttribute("User");
        if(user == null) {
            throw new NotAuthenticatedException();
        }
    }

    @Before("@annotation(com.amatta.amatta_server.aop.MethodRequiresAuth)")
    public void authorizeMethod() throws NotAuthenticatedException, NullPointerException {
        logger.info("AuthorizationAop.authorize");

        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession(false);

        Users user = (Users) session.getAttribute("User");
        if(user == null) {
            throw new NotAuthenticatedException();
        }
    }
}
