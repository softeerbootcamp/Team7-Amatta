const SERVER_URL = {
  IMG: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/',
  API: 'http://backend.amatta.site/',
};

const INPUT = [
  {
    type: 'passwordCheck',
    name: 'password-check-input',
    label: '비밀번호를 한번 더 입력해주세요.',
    required: true,
    placeholder: '',
  },
  {
    type: 'password',
    name: 'password-input',
    label: '비밀번호 입력(영문, 숫자, 특수문자)',
    required: true,
    placeholder: '',
  },
  {
    type: 'tel',
    name: 'phone-input',
    label: '전화번호',
    required: true,
    placeholder: '',
  },
  {
    type: 'verificationCode',
    name: 'verification-code-input',
    label: '인증번호',
    required: true,
    placeholder: '',
  },
  {
    type: 'email',
    name: 'email-input',
    label: '이메일',
    required: true,
    placeholder: '',
  },
];

export { SERVER_URL, INPUT };
