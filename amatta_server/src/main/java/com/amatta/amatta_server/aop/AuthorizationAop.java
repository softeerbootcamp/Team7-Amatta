package com.amatta.amatta_server.aop;

import com.amatta.amatta_server.exception.NotAuthenticatedException;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Component
@Aspect
public class AuthorizationAop {
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationAop.class);

    @Before("@annotation(com.amatta.amatta_server.aop.RequiresAuth)")
    public void authorize() throws NotAuthenticatedException, NullPointerException {
        logger.info("AuthorizationAop.authorize");
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
    }
}
