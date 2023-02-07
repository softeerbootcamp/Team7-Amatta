package com.amatta.amatta_server.gifticon.service;

import com.amatta.amatta_server.aop.ClassRequiresAuth;
import com.amatta.amatta_server.exception.DuplicateGifticonException;
import com.amatta.amatta_server.gifticon.dto.GifticonDto;
import com.amatta.amatta_server.gifticon.dto.GifticonImageDto;
import com.amatta.amatta_server.gifticon.dto.GifticonTextDto;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.repository.GifticonRepository;
import com.amatta.amatta_server.gifticon.util.GifticonMapper;
import com.amatta.amatta_server.gifticon.util.GifticonMapperFactory;
import com.amatta.amatta_server.gifticon.util.RequestGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Service
@ClassRequiresAuth
public class GifticonService {
    private final GifticonRepository gifticonRepository;
    private final RequestGenerator requestGenerator;

    @Autowired
    public GifticonService(GifticonRepository gifticonRepository, RequestGenerator requestGenerator) {
        this.gifticonRepository = gifticonRepository;
        this.requestGenerator = requestGenerator;
    }

    public ResponseEntity<String> extractGifticonText(GifticonImageDto dto) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(
                requestGenerator.getUrl(),
                HttpMethod.POST,
                requestGenerator.generate(dto),
                String.class
        );
    }

    public Gifticon mapTextToGifticon(GifticonTextDto dto) throws NullPointerException, IndexOutOfBoundsException {
        GifticonMapper mapper = Objects.requireNonNull(GifticonMapperFactory.getGifticonMapper(dto.getTexts()));
        return mapper.map(dto.getTexts());
    }

    @Transactional
    public void addGifticon(GifticonDto dto) throws DuplicateGifticonException {
        long uid = dto.getUid();
        byte[] image = dto.getImage().getBytes();
        String brandName = dto.getBrandName();
        String itemName = dto.getItemName();
        String barcode = dto.getBarcode();
        LocalDateTime expiresAt = LocalDateTime.parse(dto.getExpiresAtInString().concat(" 00:00:00"), DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));
        LocalDateTime usedAt = LocalDateTime.now().plusYears(100);
        int price = dto.getPrice();

        if(gifticonRepository.findByBarcode(barcode).isPresent()) {
            throw new DuplicateGifticonException();
        }

        gifticonRepository.addGifticon(
                uid,
                image,
                brandName,
                itemName,
                barcode,
                expiresAt,
                usedAt,
                price
        );
    }

    public List<Gifticon> findGifticonList() {
        return null;
    }
}
