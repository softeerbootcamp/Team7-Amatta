const SERVER_URL = {
  IMG: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/',
  API: 'http://15.164.13.149:8080',
};

const INPUT = [
  {
    type: 'email',
    name: 'email-input',
    label: '이메일',
    required: true,
  },
  {
    type: 'tel',
    name: 'phone-input',
    label: '전화번호',
    required: true,
  },
  {
    type: 'verificationCode',
    name: 'verification-code',
    label: '인증번호',
    required: true,
  },
  {
    type: 'password',
    name: 'password-input',
    label: '비밀번호',
    required: true,
  },
];

export { SERVER_URL, INPUT };
