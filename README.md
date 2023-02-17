![header](https://capsule-render.vercel.app/api?type=waving&color=92B8B1&height=300&section=header&text=Amatta&fontSize=90&animation=fadeIn&fontColor=ffffff)

<h4>:open_mouth: <i>기프티콘이 많아서 관리가 어려웠다면?</h4>  
<h4>:hushed: 기프티콘을 한번에 보기가 어려웠다면?</h4>  
<h4>:anguished: 기프티콘의 유효기간을 자주 잊어서 사용하지 못했었다면?</i></h4>
<br>

## 🎖 Introduction

### 🎁 About our project

휴대폰에 이미지로 저장하는 기프티콘을 까먹지 말고 쓰자는 취지에서 기획한
<br> 기프티콘 이미지를 업로드하면 사용 여부 및 사용 기한을 확인할 수 있도록 하는 서비스❣️

기프티콘을 유효기간 또는 등록 순으로 원하는 대로 정렬하여 확인할 수 있고,      
유효기간이 임박했을 경우에는 사용자 디바이스에게 알림을 주어 기프티콘을 잊지 않고 사용할 수 있게 도와주는 것이 주 기능입니다.    
또한 보유하고 있는 기프티콘을 다른 사용자에게 선물할 수 있으며 기프티콘을 사용완료 처리를 하여 사용내역도 확인할 수 있습니다.    
기프티콘을 주로 사용하는 디바이스가 모바일이기 때문에 모바일 웹앱으로 개발하기로 결정하였습니다.   
<br>

### 🎨 Our Prototype

<img src="https://amatta-icons.s3.ap-northeast-2.amazonaws.com/images/figma.png" width = "900" alt="figma-image" />
<br>

### :sparkling_heart: Main Features
:one: 회원가입/로그인         <br>

:two: 이메일 찾기/비밀번호 찾기      <br>

:three: 기프티콘을 등록하기      <br>

:four: 기프티콘 카드 리스트 보기(마감날짜순, 가격순, 등록순)   <br>

:five: 기프티콘 사용완료 처리하기 및 삭제하기   <br>

:six: 로그아웃   <br>
<br>

### 🧬 Our Architecture


<br>

## 🍭 FE

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
<img src="https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=SASS&logoColor=white">
<img src="https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=VITE&logoColor=white">
<img src="https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white">

### :wrench: Structures

```bash
  📦
  client
   │ src
   │  ├─ apis
   │  │  ├─ auth.js
   │  │  ├─ client.js
   │  │  └─ post.js
   │  ├─ assets
   │  │  ├─ gifticonSample.jpeg
   │  │  ├─ starbucks.jpg
   │  │  ├─ starbucks2.jpg
   │  │  └─ starbucks3.jpeg
   │  ├─ components
   │  │  ├─ auth
   │  │  │  ├─ confirm.js
   │  │  │  ├─ index.js
   │  │  │  ├─ login.js
   │  │  │  ├─ register.js
   │  │  │  └─ verify.js
   │  │  ├─ common
   │  │  │  ├─ dropdownMenu.js
   │  │  │  ├─ header.js
   │  │  │  ├─ index.js
   │  │  │  └─ inputForm.js
   │  │  └─ main
   │  │     ├─ cardDetail.js
   │  │     ├─ cardList.js
   │  │     └─ index.js
   │  ├─ constants
   │  │  └─ constant.js
   │  ├─ core
   │  │  └─ router.js
   │  ├─ main.js
   │  ├─ pages
   │  │  ├─ AuthPage.js
   │  │  ├─ HomePage.js
   │  │  ├─ MainPage.js
   │  │  ├─ NotFoundPage.js
   │  │  ├─ PostPage.js
   │  │  └─ index.js
   │  ├─ styles
   │  │  ├─ auth.scss
   │  │  ├─ color.scss
   │  │  ├─ common.scss
   │  │  ├─ global.scss
   │  │  ├─ header.scss
   │  │  ├─ home.scss
   │  │  ├─ main.scss
   │  │  ├─ post.scss
   │  │  └─ util.scss
   │  └─ utils
   │     ├─ EventMonad.js
   │     ├─ IOMonad.js
   │     ├─ Maybe.js
   │     ├─ customFx.js
   │     ├─ domFx.js
   │     ├─ drag.js
   │     ├─ index.js
   │     ├─ screenSize.js
   │     ├─ slider.js
   │     ├─ templateGenerator.js
   │     └─ timer.js
   └─ vite.config.js
```

<br>

## 🍬 BE
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white">
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white">
<img src="https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/GithubActions-2088FF?style=for-the-badge&logo=GithubActions&logoColor=white">
<img src="https://img.shields.io/badge/AmazonEC2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white">


- [API 명세서](https://viridian-canvas-adb.notion.site/API-b21612efb02445ccb16a34baeebc83ce)
  <br>
  <img src="https://amatta-icons.s3.ap-northeast-2.amazonaws.com/images/api.png" width="900" alt="api-document">

- <h3>ERD</h3>
  <br>
    <img width="1141" alt="erd" src="https://user-images.githubusercontent.com/65708461/218037413-a551fc8d-16a2-4308-a6f1-66eaea9778a0.png">
    

### :wrench: Structures
```bash
    📦
    src
    ├── main
    │   ├── generated
    │   ├── java
    │   │   └── com
    │   │       └── amatta
    │   │           └── amatta_server
    │   │               ├── AmattaServerApplication.java
    │   │               ├── aop
    │   │               │   ├── AuthorizationAop.java
    │   │               │   ├── ClassRequiresAuth.java
    │   │               │   └── MethodRequiresAuth.java
    │   │               ├── exception
    │   │               │   ├── DuplicateGifticonException.java
    │   │               │   ├── GifticonNotSupportedException.java
    │   │               │   └── NotAuthenticatedException.java
    │   │               ├── fcm
    │   │               │   ├── FCMInitializer.java
    │   │               │   ├── controller
    │   │               │   │   └── FCMController.java
    │   │               │   ├── dto
    │   │               │   │   └── TokenRegisterDto.java
    │   │               │   ├── model
    │   │               │   │   └── FCMToken.java
    │   │               │   ├── repository
    │   │               │   │   └── DeviceTokenRepository.java
    │   │               │   └── service
    │   │               │       └── FCMService.java
    │   │               ├── gifticon
    │   │               │   ├── controller
    │   │               │   │   └── GifticonController.java
    │   │               │   ├── dto
    │   │               │   │   ├── GifticonDto.java
    │   │               │   │   ├── GifticonImageDto.java
    │   │               │   │   └── GifticonTextDto.java
    │   │               │   ├── enums
    │   │               │   │   └── GifticonMapperEnum.java
    │   │               │   ├── model
    │   │               │   │   └── Gifticon.java
    │   │               │   ├── repository
    │   │               │   │   └── GifticonRepository.java
    │   │               │   ├── service
    │   │               │   │   └── GifticonService.java
    │   │               │   └── util
    │   │               │       ├── GifticonMapper.java
    │   │               │       ├── GifticonMapperFactory.java
    │   │               │       ├── KakaoGifticonMapper.java
    │   │               │       ├── NaverAPIRequestGenerator.java
    │   │               │       ├── NoMatchMapper.java
    │   │               │       └── RequestGenerator.java
    │   │               ├── index
    │   │               │   └── IndexController.java
    │   │               └── user
    │   │                   ├── controller
    │   │                   │   └── UserController.java
    │   │                   ├── dto
    │   │                   │   ├── UserChangePasswordReq.java
    │   │                   │   ├── UserChangePasswordRes.java
    │   │                   │   ├── UserEmailExistRes.java
    │   │                   │   ├── UserFindEmailReq.java
    │   │                   │   ├── UserFindEmailRes.java
    │   │                   │   ├── UserFindPasswordByEmailReq.java
    │   │                   │   ├── UserFindPasswordByEmailRes.java
    │   │                   │   ├── UserJoinReq.java
    │   │                   │   ├── UserJoinRes.java
    │   │                   │   ├── UserLoginReq.java
    │   │                   │   ├── UserLoginRes.java
    │   │                   │   ├── UserLogoutRes.java
    │   │                   │   ├── UserMypageRes.java
    │   │                   │   └── UserPhoneNumExistRes.java
    │   │                   ├── model
    │   │                   │   └── Users.java
    │   │                   ├── repository
    │   │                   │   └── UserRepository.java
    │   │                   └── service
    │   │                       ├── MailService.java
    │   │                       └── UserService.java
    │   └── resources
    │       ├── application.properties
    │       └── team7-amatta-firebase-adminsdk-pa4f5-612a44bb30.json
    └── test
        ├── generated_tests
        └── java
            └── com
                └── amatta
                    └── amatta_server
                        ├── AmattaServerApplicationTests.java
                        ├── DatabaseTest.java
                        ├── FCMRepoTest.java
                        ├── GifticonControllerTest.java
                        └── user
                            └── UserControllerTest.java
 ```
<br>

## 👩‍👩‍👧‍👧 Contributors
| Name | Country | Where to find us | Role |
| ---- | ------- | ----------------- | ---- |
| MinJi Chang <br /> <img src="https://avatars.githubusercontent.com/SUMMERLOVE7" width="100" />  | Republic of Korea | [Github](https://github.com/SUMMERLOVE7)| FRONTEND |
| JangOh Jeong  <br /> <img src="https://avatars.githubusercontent.com/sunjh96" width="100" />  | Republic of Korea | [Github](https://github.com/sunjh96)| FRONTEND |
| TaeWan Kim <br /> <img src="https://avatars.githubusercontent.com/ktykty0722" width="100" />  | Republic of Korea | [Github](https://github.com/ktykty0722)| BACKEND |
| 덕진 장 <br /> <img src="https://avatars.githubusercontent.com/201724554" width="100" />  | Republic of Korea | [Github](https://github.com/201724554)| BACKEND |


## Github

- [Github 저장소](https://github.com/softeerbootcamp/Team7-Project)
- [Github 위키](https://github.com/softeerbootcamp/Team7-Project/wiki)
- [Github 프로젝트](https://github.com/orgs/softeerbootcamp/projects/3)
