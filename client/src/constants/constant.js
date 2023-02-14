export const SERVER_URL = {
  IMG: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/',
  API: 'https://backend.amatta.site/',
};

export const AUTH = {
  register: '회원가입',
  login: '로그인',
  findPw: '비밀번호 찾기',
  findEmail: '이메일 찾기',
};

const EMAIL_REG = '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$';
const CODE_REG = '^[0-9]{6}$';
const PHONE_REG = '^(\\d{3})-(\\d{4})-(\\d{4})$';
const NAME_REG = '^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$';

export const INPUT = [
  {
    type: 'price',
    name: 'price-input',
    label: '상품 가격',
    required: true,
  },
  {
    type: 'shop',
    name: 'shop-input',
    label: '가게 이름',
    required: true,
  },
  {
    type: 'menu',
    name: 'menu-input',
    label: '상품 이름',
    required: true,
  },
  {
    type: 'password',
    name: 'password-check-input',
    label: '비밀번호를 한번 더 입력해주세요.',
    required: true,
    dataType: 'passwordCheck',
  },
  {
    type: 'password',
    name: 'password-input',
    label: '비밀번호 입력(영문, 숫자, 특수문자)',
    required: true,
    dataType: 'password',
  },
  {
    type: 'tel',
    name: 'phone-input',
    label: '전화번호',
    required: true,
    dataType: 'phoneNumber',
    maxlength: 13,
    pattern: PHONE_REG,
  },
  {
    type: 'verificationCode',
    name: 'verification-code-input',
    label: '인증번호',
    required: true,
    dataType: 'verificationCode',
    maxlength: 6,
    pattern: CODE_REG,
  },
  {
    type: 'email',
    name: 'email-input',
    label: '이메일',
    required: true,
    dataType: 'email',
    pattern: EMAIL_REG,
  },
  {
    type: 'userName',
    name: 'user-name-input',
    label: '이름',
    required: true,
    dataType: 'name',
    pattern: NAME_REG,
  },
];
