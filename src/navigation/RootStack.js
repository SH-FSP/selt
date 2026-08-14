import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

//----
import StackNavigator from './StackNavigator';
import { COLORS } from '../globalStyle/Theme';
import {
  notificationListener,
  requestNotificationPermission,
} from '../utils/notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '../constants';

const RootStack = () => {
  const dispatch = useDispatch();

  const navigationRef = useNavigationContainerRef();

  const [appBarStyle, setAppBarStyle] = useState({
    bgColor: COLORS.mainBg,
    contStyle: 'light-content',
    translucent: null,
  });

  const authScreens = [
    'LoginScreen',
    'SignupScreen',
    'VerifyEmailScreen',
    'ForgotPasswordScreen',
    'ResetPasswordScreen',
    'SplashScreen',
  ];

  const handleStatusBar = () => {
    const route = navigationRef.getCurrentRoute();

    if (authScreens.includes(route.name)) {
      setAppBarStyle({
        bgColor: COLORS.mainBg,
        contStyle: 'dark-content',
        translucent: false,
      });
    } else if (route.name == 'OnBoardingScreen') {
      setAppBarStyle({
        bgColor: 'transparent',
        contStyle: 'light-content',
        translucent: true,
      });
    } else if (route.name == 'Home') {
      setAppBarStyle({
        bgColor: COLORS.primary,
        contStyle: 'light-content',
        translucent: false,
      });
    } else {
      setAppBarStyle({
        bgColor: COLORS.primary,
        contStyle: 'light-content',
        translucent: false,
      });
    }
  };

  useEffect(() => {
    (async () => {
      let fcmToken = await AsyncStorage.getItem(KEYS.FCM_TOKEN);
      __DEV__ && console.log(' RootStack:83 ~ fcmToken:', !!fcmToken);

      if (!fcmToken) {
        requestNotificationPermission();
      }
      notificationListener(dispatch);
    })();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={handleStatusBar}
      onStateChange={handleStatusBar}
    >
      <FlashMessage position="top" onHide={handleStatusBar} />
      <StatusBar
        animated={true}
        backgroundColor={appBarStyle.bgColor}
        barStyle={appBarStyle.contStyle}
        translucent={appBarStyle.translucent}
        showHideTransition={'fade'}
      />
      <StackNavigator />
      {/* <Loader /> */}
      {/* <NoInternetModal /> */}
    </NavigationContainer>
  );
};
export default RootStack;
