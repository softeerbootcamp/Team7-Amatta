package com.amatta.amatta_server.gifticon.service;

import com.amatta.amatta_server.aop.ClassRequiresAuth;
import com.amatta.amatta_server.exception.DuplicateGifticonException;
import com.amatta.amatta_server.exception.GifticonNotSupportedException;
import com.amatta.amatta_server.exception.GifticonParseException;
import com.amatta.amatta_server.exception.NotAuthenticatedException;
import com.amatta.amatta_server.gifticon.dto.*;
import com.amatta.amatta_server.gifticon.model.Gifticon;
import com.amatta.amatta_server.gifticon.repository.GifticonRepository;
import com.amatta.amatta_server.gifticon.util.GifticonMapper;
import com.amatta.amatta_server.gifticon.util.GifticonMapperFactory;
import com.amatta.amatta_server.gifticon.util.RequestGenerator;
import com.amatta.amatta_server.user.model.Users;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Service
@ClassRequiresAuth
public class GifticonService {
    private final GifticonRepository gifticonRepository;
    private final RequestGenerator requestGenerator;

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;

    @Autowired
    AmazonS3Client amazonS3Client;

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

    public Gifticon mapTextToGifticon(GifticonTextDto dto) throws GifticonParseException, GifticonNotSupportedException {
        GifticonMapper mapper = GifticonMapperFactory.getGifticonMapper(dto.getTexts());
        return mapper.map(dto.getTexts());
    }

    @Transactional
    public void addGifticon(GifticonDto dto, MultipartFile image, MultipartFile thumbnail) throws DuplicateGifticonException, IOException {
        Users user = getUserBySessionId();
        if(user == null) {
            throw new NotAuthenticatedException();
        }
        long uid = user.getId();
        String brandName = dto.getBrandName();
        String itemName = dto.getItemName();
        String barcode = dto.getBarcode();
        LocalDate expiresAt = LocalDate.parse(dto.getExpiresAtInString(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate usedAt = LocalDate.now().plusYears(100);
        int price = dto.getPrice();

        if(gifticonRepository.findByBarcode(barcode).isPresent()) {
            throw new DuplicateGifticonException();
        }
        String imagePath = sendToS3(image, String.valueOf(System.currentTimeMillis()));
        String thumbnailPath = sendToS3(thumbnail, String.valueOf(System.currentTimeMillis()));

        gifticonRepository.addGifticon(
                uid,
                imagePath,
                thumbnailPath,
                brandName,
                itemName,
                barcode,
                expiresAt,
                usedAt,
                price
        );
    }

    @Transactional(readOnly = true)
    public List<Gifticon> findGifticons(String keyword) {
        Users user = getUserBySessionId();
        if(user == null) {
            throw new NotAuthenticatedException();
        }
        return gifticonRepository.findByUid(user.getId(), keyword);
    }

    @Transactional
    public void useGifticon(GifticonUseDto dto) throws IllegalArgumentException {
        Users user = getUserBySessionId();
        if(user == null) {
            throw new NotAuthenticatedException();
        }
        Gifticon gifticon = gifticonRepository.findById(dto.getGifticonId()).orElseThrow(()-> new IllegalArgumentException("기프티콘을 찾을 수 없습니다"));
        if(gifticon.getUid() != user.getId()) {
            throw new IllegalArgumentException("잘못된 요청입니다");
        }
        gifticonRepository.useGifticon(dto.getGifticonId());
    }

    @Transactional
    public List<Gifticon> usedGifticonList() {
        Users user = getUserBySessionId();
        if(user == null) {
            throw new NotAuthenticatedException();
        }
        return gifticonRepository.findUsedByUid(user.getId());
    }

    private Users getUserBySessionId() {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        HttpSession session = request.getSession(false);
        return (Users) session.getAttribute("User");
    }

    private String sendToS3(MultipartFile image, String name) throws IOException {
        long size = image.getSize();
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(image.getContentType());
        objectMetaData.setContentLength(size);
        amazonS3Client.putObject(
                new PutObjectRequest(S3Bucket, name, image.getInputStream(), objectMetaData)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );
        return amazonS3Client.getUrl(S3Bucket, name).toString();
    }

    public List<Gifticon> test(String keyword) {
        return gifticonRepository.test(keyword);
    }

    public List<Gifticon> usedTest() {
        return gifticonRepository.findUsedByUid(2);
    }

    @Transactional
    public void deleteGifticon(GifticonDeleteDto dto) throws IllegalArgumentException{
        Users user = getUserBySessionId();
        if(user == null) {
            throw new NotAuthenticatedException();
        }
        Gifticon gifticon = gifticonRepository.findById(dto.getGifticonId()).orElseThrow(()-> new IllegalArgumentException("기프티콘을 찾을 수 없습니다"));
        if(gifticon.getUid() != user.getId()) {
            throw new IllegalArgumentException("잘못된 요청입니다");
        }
        gifticonRepository.deleteGifticon(dto.getGifticonId());
    }
}
