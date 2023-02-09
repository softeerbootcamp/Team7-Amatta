package com.amatta.amatta_server.gifticon.service;

import com.amatta.amatta_server.aop.ClassRequiresAuth;
import com.amatta.amatta_server.exception.DuplicateGifticonException;
import com.amatta.amatta_server.exception.GifticonNotSupportedException;
import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.gifticon.dto.GifticonDto;
import com.amatta.amatta_server.gifticon.dto.GifticonImageDto;
import com.amatta.amatta_server.gifticon.dto.GifticonTextDto;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.repository.GifticonRepository;
import com.amatta.amatta_server.gifticon.util.GifticonMapper;
import com.amatta.amatta_server.gifticon.util.GifticonMapperFactory;
import com.amatta.amatta_server.gifticon.util.RequestGenerator;
import com.amatta.amatta_server.user.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
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

    public Gifticon mapTextToGifticon(GifticonTextDto dto) throws NullPointerException, IndexOutOfBoundsException, GifticonNotSupportedException {
        GifticonMapper mapper = GifticonMapperFactory.getGifticonMapper(dto.getTexts());
        return mapper.map(dto.getTexts());
    }

    @Transactional
    public void addGifticon(GifticonDto dto) throws DuplicateGifticonException {
        long uid = getUserBySessionId().getId();
        byte[] image = dto.getImage().getBytes();
        String brandName = dto.getBrandName();
        String itemName = dto.getItemName();
        String barcode = dto.getBarcode();
        LocalDate expiresAt = LocalDate.parse(dto.getExpiresAtInString(), DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        LocalDate usedAt = LocalDate.now().plusYears(100);
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

    @Transactional(readOnly = true)
    public List<Gifticon> findGifticons() {
        Users user = getUserBySessionId();
        if(user == null) {
            throw new NotAuthenticatedException();
        }
        return gifticonRepository.findByUid(user.getId());
    }

    private Users getUserBySessionId() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession(false);
        return (Users) session.getAttribute("User");
    }
}
