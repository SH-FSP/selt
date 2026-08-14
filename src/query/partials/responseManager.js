import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '../../constants';
import { showMessage } from '../../utils';
import { setUser } from '../../redux/slices/appSlice';
import { CommonActions } from '@react-navigation/native';
import { queryClient } from '../../api/api';
import { getServiceCategories, getServices } from '../../api/bookingService';
import { getPhotosCategories } from '../../api/generalService';

async function Prefetching() {
  await queryClient.prefetchQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
  await queryClient.prefetchQuery({
    queryKey: ['serviceCategories'],
    queryFn: getServiceCategories,
  });
  await queryClient.prefetchQuery({
    queryKey: ['photosCatagories'],
    queryFn: getPhotosCategories,
  });
}

export const onLoginSuccess = async (
  response,
  navigation,
  dispatch,
  { email, password },
) => {
  if (response?.status) {
    dispatch(setUser(response?.data));
    await AsyncStorage.setItem(KEYS.ACCESS_TOKEN, response?.token);
    await AsyncStorage.setItem(
      KEYS.CREDENTIALS,
      JSON.stringify({ email, password }),
    );

    //Prefetching Data:
    await Prefetching();

    if (response?.data?.email_verified_at) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'DrawerTabs' }],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'VerifyEmailScreen',
              params: {
                fromLogin: true,
              },
            },
          ],
        }),
      );
    }
  }
};

export const onSocialSuccessLogin = async (
  response,
  reqData,
  navigation,
  dispatch,
) => {
  const { provider, token } = reqData;

  try {
    if (response?.status) {
      dispatch(setUser(response?.data));

      // CHECK ACCOUNT APPROVAL FROM ADMIN
      await AsyncStorage.setItem(KEYS.LOGIN_TYPE, provider); // SOCAIL TYPE
      await AsyncStorage.setItem(KEYS.SOCIAL_TOKEN, token); // SOCIAL TOKENS
      await AsyncStorage.setItem(KEYS.ACCESS_TOKEN, response?.token);

      //Prefetching Data:
      await Prefetching();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'DrawerTabs' }],
        }),
      );
    } else {
      const successMessage = response?.message;
      showMessage({
        type: 'danger',
        message: successMessage,
      });
    }
  } catch (ERR) {
    console.log('🚀 ~ onSocialSuccessLogin ~ ERR:', ERR);
  }
};

export const onRegisterSuccess = async (response, navigation) => {
  if (response?.status) {
    await AsyncStorage.setItem(KEYS.ACCESS_TOKEN, response?.token);
    showMessage({
      type: 'success',
      message: response?.message,
    });
    navigation.replace('VerifyEmailScreen');
  }
};

export const onResetPasswordError = async (response, setScreenType) => {
  if (response?.status == 401) {
    const otpMessage = response?.data?.message;
    console.log('🚀 ~ otpMessage:', otpMessage);
    if (otpMessage.indexOf('otp') !== -1 || otpMessage.indexOf('OTP') !== -1) {
      setScreenType('verification');
    }
  }
};
