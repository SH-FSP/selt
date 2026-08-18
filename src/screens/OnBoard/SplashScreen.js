import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
// --------
import { Container } from '../../atomComponents';
import SlideInView from '../../animations/SlideView';
import BrandLogo from '../../components/BrandLogo';
import Sizer from '../../helpers/Sizer';
import { KEYS } from '../../constants';
import { useCustomMutation } from '../../query/useCustomMutation';
import { login } from '../../api/userService';
import {
  onLoginSuccess,
  onSocialSuccessLogin,
} from '../../query/partials/responseManager';
import { handleLogout } from '../../redux/slices/appSlice';
import { socialLogin } from '../../api/socialService';
import { COLORS } from '../../globalStyle/Theme';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Custom Mutation Hook:
  const { mutate: requestLogin } = useCustomMutation({
    mutationFn: login,
    onSuccess: (response, reqData) => {
      onLoginSuccess(response, navigation, dispatch, reqData);
    },
    onError: () => {
      dispatch(handleLogout());
      navigation.replace('LoginScreen');
    },
  });

  //Custom Social Login Muatuion:
  const { mutateAsync: socialLoginFn, isPending } = useCustomMutation({
    mutationFn: socialLogin,
    onSuccess: (response, reqData) => {
      onSocialSuccessLogin(response, reqData, navigation, dispatch);
    },
    onError: () => {
      dispatch(handleLogout());
      navigation.replace('LoginScreen');
    },
  });

  useEffect(() => {
    // AsyncStorage.clear();
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const fisrtTime = await AsyncStorage.getItem(KEYS.IS_ONBOARD);

      // NO NEED FOR ONBOARD
      if (fisrtTime === null) {
        navigation.replace('OnBoardingScreen');
        return;
      }
      const device_token = await AsyncStorage.getItem(KEYS.FCM_TOKEN);
      const provider = await AsyncStorage.getItem(KEYS.LOGIN_TYPE);
      const socialToken = await AsyncStorage.getItem(KEYS.SOCIAL_TOKEN);

      if (['google', 'apple'].includes(provider) && socialToken) {
        await socialLoginFn({
          token: socialToken,
          device_token,
          provider,
        });
        return;
      }
      const credentials = await AsyncStorage.getItem(KEYS.CREDENTIALS);

      if (credentials) {
        const userData = JSON.parse(credentials);
        requestLogin({ ...userData, device_token });
      } else {
        navigation.replace('LoginScreen');
      }
    } catch (err) {
      console.log('🚀 ~ checkUser ~ err:', err);
      navigation.replace('LoginScreen');
    }
  };

  return (
    <Container
      conStyle={styles.container}
      isPaddingVertical={false}
      isPadding={false}
    >
      <SlideInView slide="right" slideDuration={700}>
        <BrandLogo
          variant="white"
          width={Sizer.hSize(240)}
          height={Sizer.vSize(110)}
        />
      </SlideInView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});

export default SplashScreen;
