import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//------
import {
  AdminChatScreen,
  AllServicesScreen,
  AppointmentBookingScreen,
  BookingChatScreen,
  BookingSuccessScreen,
  CheckoutScreen,
  EditProfileScreen,
  ForgotPasswordScreen,
  GalleryScreen,
  // GetStartedScreen,
  LoginScreen,
  NotificationScreen,
  OnBoardingScreen,
  PaymentSuccessScreen,
  PostReviewScreen,
  ResetPasswordScreen,
  ServiceDetailsScreen,
  ServicePhotos,
  ServicePhotosScreen,
  ServiceReviews,
  ServiceReviewsScreen,
  SignupScreen,
  SplashScreen,
  VerifyEmailScreen,
} from '../screens';

import DrawerNavigator from './DrawerNavigator';
import { COLORS } from '../globalStyle/Theme';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        navigationBarColor: COLORS.mainBg,
      }}
      initialRouteName={__DEV__ ? 'SplashScreen' : 'SplashScreen'}
    >
      {/* Splash */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      {/* Onboard */}
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />

      {/* Auth */}
      {/* <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} /> */}
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="ServiceDetailsScreen"
        component={ServiceDetailsScreen}
      />

      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
        }}
        name="ServicePhotosScreen"
        component={ServicePhotosScreen}
      />
      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
        }}
        name="ServiceReviewsScreen"
        component={ServiceReviewsScreen}
      />
      <Stack.Screen
        name="AppointmentBookingScreen"
        component={AppointmentBookingScreen}
      />
      <Stack.Screen name="AllServicesScreen" component={AllServicesScreen} />
      <Stack.Screen
        name="PostReviewScreen"
        component={PostReviewScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          animation: 'flip',
        }}
      />
      <Stack.Screen
        name="AdminChatScreen"
        component={AdminChatScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="BookingChatScreen"
        component={BookingChatScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen name="AllServiceScreen" component={AllServicesScreen} />
      <Stack.Screen
        name="BookingSuccessScreen"
        component={BookingSuccessScreen}
      />

      {/* Main */}
      <Stack.Screen name="DrawerTabs" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
