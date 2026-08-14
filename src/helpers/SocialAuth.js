import {Alert, Platform, ToastAndroid} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import {showMessage} from '../utils';
GoogleSignin.configure({
  webClientId:
    '794678082583-osl14etmoood74r1tgathlbhgqd7rli3.apps.googleusercontent.com',
});

// APPLE SIGN IN
export const handleAppleSign = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [
      AppleAuthRequestScope.FULL_NAME,
      AppleAuthRequestScope.EMAIL,
    ],
  });

  return appleAuthRequestResponse?.identityToken;
};

export const handleGoogleSign = async () => {
  try {
    await GoogleSignin.signOut();
    const data = await GoogleSignin?.signIn();
    console.log('🚀 ~ handleGoogleSign ~ data:', data);
    if (data?.type == 'cancelled') {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'User cancelled the sign-in flow',
          ToastAndroid.SHORT,
        );
      } else {
        Alert.alert('User cancelled the sign-in flow');
      }
      return;
    }

    const {accessToken} = await GoogleSignin.getTokens();

    return accessToken;
  } catch (error) {
    console.log('handleGoogleSign ~ error:', error);

    if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('User cancelled the sign-in flow');
    } else if (error?.code === statusCodes.IN_PROGRESS) {
      showMessage({
        type: 'info',
        message: 'Sign-in already in progress',
      });
    } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      showMessage({
        type: 'warning',
        message: 'Google Play Services not available',
      });
    }
  }
};
