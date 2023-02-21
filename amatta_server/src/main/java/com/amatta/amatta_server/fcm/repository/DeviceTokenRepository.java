package com.amatta.amatta_server.fcm.repository;

import com.amatta.amatta_server.fcm.model.FCMToken;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DeviceTokenRepository extends CrudRepository<FCMToken, Long> {
    @Query("SELECT LAST_INSERT_ID()")
    long last_insert_id();

    @Modifying
    @Query("INSERT INTO device_token(uid, token) VALUES (:uid, :token)")
    void addToken(@Param("uid") long uid,
                  @Param("token") String token);

    @Query("SELECT id, uid, token FROM device_token WHERE uid = :uid")
    List<FCMToken> findByUid(@Param("uid") long uid);

    @Query("SELECT * FROM device_token")
    List<FCMToken> findAllTokens();

    @Query("SELECT token FROM device_token WHERE uid IN " +
            "(SELECT uid FROM gifticon WHERE expiresat BETWEEN (SELECT now()) AND :expirationThresholdDays AND usedat > (SELECT now()))")
    List<String> findTokensByUidsOfGifticonsAboutToExpire(@Param("expirationThresholdDays") LocalDate date);

    @Modifying
    @Query("DELETE FROM device_token WHERE uid = :uid")
    void deleteTokenByUid(@Param("uid") long uid);
}
