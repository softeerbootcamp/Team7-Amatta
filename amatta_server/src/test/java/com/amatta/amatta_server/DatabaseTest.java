package com.amatta.amatta_server;

import com.amatta.amatta_server.fcm.repository.DeviceTokenRepository;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.repository.GifticonRepository;
import com.amatta.amatta_server.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class DatabaseTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DeviceTokenRepository tokenRepository;

    @Autowired
    GifticonRepository gifticonRepository;

    @DisplayName("DB에 값 INSERT 후 가져오기")
    @Test
    @Transactional
    void DB_TEST() {
        try {
            int result = jdbcTemplate.update("insert into users(email, password, name, phoneNumber) values (?, ?, ?, ?)",
                    "emailasdfs", "paasdfssword", "naasdfme", "phonasdfeNums");

            assertEquals(1, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @DisplayName("만료일자가 가까운 기프티콘을 가지고 있는 유저의 token 가져오기")
    @Test
    @Transactional
    void token_by_expiration_date_test() {
        LocalDate now = LocalDate.now();
        userRepository.addUser("testest@naver.com", "testest1234", "테스트", "010-1111-1111");
        long id = userRepository.last_insert_id();
        gifticonRepository.addGifticon(id, "test", "test", "test brand", "test item", "12341234",
                now.plusDays(2), now.plusYears(100), 2000);
        tokenRepository.addToken(id, "testtoken");
        List<String> list = tokenRepository.findTokensByUidsOfGifticonsAboutToExpire(now.plusDays(Gifticon.expirationThresholdDays));
        assertNotEquals(0, list.size());
    }
}
