const SERVER_URL = {
  IMG: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/',
  API: 'http://backend.amatta.site/',
};

const EMAIL_REG = '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$';
const CODE_REG = '^[0-9]{6}$';
const PHONE_REG = '^(\\d{3})-(\\d{4})-(\\d{4})$';

const INPUT = [
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
];

export { SERVER_URL, INPUT };
