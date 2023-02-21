import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { inputForm, notification } from '@/components/common';
import { loginU } from '@/apis/auth';
import { navigate } from '@/core/router';
import { INPUT } from '@/constants/constant';
import { $ } from '@/utils';
import { _ } from '@/utils/customFx';
import { fcmToken } from '@/apis/firebase';

const login = () => {
  const LOGIN_INPUT_TYPE = ['email', 'password'];

  let userData = {
    email: '',
    password: '',
  };

  const loginTemp = `
    <h1>Welcome Back!</h1>
    <h4>Amatta 로그인하기</h4>
    <h5>기프티콘을 효율적으로 관리해보세요</h5>
  `;

  const setUserData = (userData, target) => {
    const newUserData = { ...userData };
    const dataType = _.getDataset(target, 'data-input');
    newUserData[dataType] = target.value;

    return newUserData;
  };

  const addInputForm = (fragment) => (input) => inputForm({ ...input, target: fragment })();
  const loginInputs = ({ type }) => LOGIN_INPUT_TYPE.includes(type);

  const handleChange = ({ target }) => {
    if (!target.validity.valid) return;

    const updatedUserData = setUserData(userData, target);
    userData = updatedUserData;
  };

  const submitData = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    await loginU(userData);
    navigate('/card');
    await notification('로그인 성공', 'login');

    const firebaseConfig = {
      apiKey: 'AIzaSyCsLBsvozvTnYlDH-5cS0A8X_AjV5o4jjM',
      authDomain: 'amatta-4934f.firebaseapp.com',
      projectId: 'amatta-4934f',
      storageBucket: 'amatta-4934f.appspot.com',
      messagingSenderId: '196308516589',
      appId: '1:196308516589:web:64545440aa5021e8a496e4',
      measurementId: 'G-4JBCQPF50K',
    };

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    Notification.requestPermission().then((res) => {
      if (res === 'granted') {
        getToken(messaging, {
          vapidKey:
            'BPTfJAoUaJeyzryOu29dcccPl_1Db8OC4I_yBCC4qRTn_CfSHa_F10PoafMgkUkc7ynARCpU1RGyWRb-kAoDN4Q',
        }).then((tokens) => {
          fcmToken(tokens);
        });
      }
      if (res === 'denied') window.alert('알림을 받으시려면 알림을 허용해주세요');
    });
  };

  // prettier-ignore
  const handleSubmission = (target) => 
    _.pipe(
      handleSubmitData(target),
      notification('로그인', 'login'));

  // prettier-ignore
  const handleSubmitData = (target) => 
    _.pipe(
      $.find('.auth-button'),
      $.on('click', submitData))(target);

  // prettier-ignore
  const handleChangeInput = (target) => 
    _.pipe(
      $.find('#root'),
      $.on('input', handleChange))(target);

  // prettier-ignore
  const appendInputForm = (fragment) => 
      _.go(
        INPUT,
        _.filter(loginInputs),
        ([passwordCheck, password, email]) => [password, email] ,
        _.map(addInputForm(fragment)),
        _.flatOne);

  // prettier-ignore
  const appendLogin = (fragment) =>  
    _.go(
      fragment,
      $.find('.auth-form-section'),
      $.insert(loginTemp),
      appendInputForm,
      () => handleChangeInput(document),
      () => handleSubmitData(fragment),
      // () => handleSubmission(fragment),
      () => fragment);

  return appendLogin;
};

export default login;
