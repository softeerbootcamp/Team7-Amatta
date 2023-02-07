package com.amatta.amatta_server.gifticon.repository;

import com.amatta.amatta_server.gifticon.model.Gifticon;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface GifticonRepository extends CrudRepository<Gifticon, Long> {
    @Query("SELECT * FROM gifticon WHERE barcode = :barcode")
    Optional<Gifticon> findByBarcode(@Param("barcode") String barcode);

    @Modifying
    @Query("INSERT INTO gifticon(uid, image, brandName, itemName, barcode, expiresAt, usedAt, price)" +
            " VALUES(:uid, :image, :brandName, :itemName, :barcode, :expiresAt, :usedAt, :price)")
    void addGifticon(
            @Param("uid") long uid,
            @Param("image") byte[] image,
            @Param("brandName") String brandName,
            @Param("itemName") String itemName,
            @Param("barcode") String barcode,
            @Param("expiresAt") LocalDateTime expiresAt,
            @Param("usedAt") LocalDateTime usedAt,
            @Param("price") int price
    );
}
