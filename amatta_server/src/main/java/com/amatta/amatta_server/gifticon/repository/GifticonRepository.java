package com.amatta.amatta_server.gifticon.repository;

import com.amatta.amatta_server.gifticon.model.Gifticon;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface GifticonRepository extends CrudRepository<Gifticon, Long> {
    @Query("SELECT LAST_INSERT_ID()")
    long findLastInsertId();

    @Query("SELECT * FROM gifticon WHERE barcode = :barcode")
    Optional<Gifticon> findByBarcode(@Param("barcode") String barcode);

    @Query("SELECT " +
            "id, " +
            "uid, " +
            "itemName, " +
            "brandName, " +
            "image,  " +
            "thumbnail, " +
            "barcode, " +
            "expiresAt, " +
            "usedAt, " +
            "price FROM gifticon WHERE id = :id")
    Optional<Gifticon> findById(@Param("id") long id);

    @Modifying
    @Query("INSERT INTO gifticon(uid, image, thumbnail, brandName, itemName, barcode, expiresAt, usedAt, price)" +
            " VALUES (:uid, :image, :thumbnail, :brandName, :itemName, :barcode, :expiresAt, :usedAt, :price)")
    void addGifticon(
            @Param("uid")       long uid,
            @Param("image")     String image,
            @Param("thumbnail") String thumbnail,
            @Param("brandName") String brandName,
            @Param("itemName")  String itemName,
            @Param("barcode")   String barcode,
            @Param("expiresAt") LocalDate expiresAt,
            @Param("usedAt")    LocalDate usedAt,
            @Param("price")     int price
    );

    @Query("SELECT " +
            "id, " +
            "uid, " +
            "itemName, " +
            "brandName, " +
            "image,  " +
            "thumbnail, " +
            "barcode, " +
            "expiresAt, " +
            "usedAt, " +
            "price FROM gifticon WHERE uid = :uid AND (itemName LIKE concat('%', :keyword, '%') OR brandName LIKE concat('%', :keyword, '%'))")
    List<Gifticon> findByUid(@Param("uid") long uid, @Param("keyword") String keyword);

    @Modifying
    @Query("UPDATE gifticon SET usedAt = (SELECT now()) WHERE id = :id")
    void useGifticon(@Param("id") long id);

    @Query("SELECT * FROM gifticon where itemName LIKE concat('%', :keyword, '%') OR brandName LIKE concat('%', :keyword, '%')")
    List<Gifticon> test(@Param("keyword") String keyword);
}
