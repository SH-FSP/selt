import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';
//----------------
import {BASEOPACITY, COLORS} from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import {showMessage} from '../../utils';
import {KEYS} from '../../constants';
import {Flex, Typography} from '../../atomComponents';
import {apple, google} from '../../assets/images';
import {handleGoogleSign, handleAppleSign} from '../../helpers/SocialAuth';
import {useCustomMutation} from '../../query/useCustomMutation';
import {socialLogin} from '../../api/socialService';
import {onSocialSuccessLogin} from '../../query/partials/responseManager';
import {handleLogout} from '../../redux/slices/appSlice';

const SocialButtons = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loaders, setLoaders] = useState({
    google: false,
    apple: false,
  });

  // Custom Social Login Muatuion:
  const {mutateAsync: socialLoginFn, isPending} = useCustomMutation({
    mutationFn: socialLogin,
    onSuccess: (response, reqData) => {
      onSocialSuccessLogin(response, reqData, navigation, dispatch);
    },
    onError: respoonse => {
      dispatch(handleLogout());
      if (fromSplash) {
        navigation.replace('LoginScreen');
      }
    },
  });

  const handleSocailLogin = async type => {
    try {
      setLoaders(prev => ({...prev, [type]: true}));
      const token =
        type === 'apple' ? await handleAppleSign() : await handleGoogleSign();
      if (!token) return;

      const deviceToken = await AsyncStorage.getItem(KEYS.FCM_TOKEN);

      await socialLoginFn({
        token,
        device_token: deviceToken,
        provider: type,
      });
    } catch (error) {
      console.log(
        '🚀 ~ SocialButtons.js:70 ~ handleSocailLogin ~ error:',
        error,
      );
      showMessage({
        type: 'danger',
        message: 'Something went wrong! Please try again',
      });
    } finally {
      setLoaders(prev => ({...prev, [type]: false}));
    }
  };

  return (
    <Flex direction="column" gap={Sizer.hSize(20)} mT={34}>
      <TouchableOpacity
        activeOpacity={BASEOPACITY}
        style={styles.authMethodButton}
        onPress={() => handleSocailLogin('google')}
        disabled={loaders.google || loaders.apple || isPending}>
        <Flex direction="row" gap={Sizer.hSize(48)}>
          {loaders.google ? (
            <View style={styles.loaderView}>
              <ActivityIndicator size={18} />
            </View>
          ) : (
            <>
              <Flex direction="row" gap={Sizer.hSize(12)}>
                <View style={styles.iconContainer}>
                  <Image
                    source={google}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Typography size={16} fFamily="poppinsMedium500">
                  Continue With Google
                </Typography>
              </Flex>
            </>
          )}
        </Flex>
      </TouchableOpacity>

      {Platform.OS == 'ios' && (
        <TouchableOpacity
          activeOpacity={BASEOPACITY}
          style={styles.authMethodButton}
          onPress={() => handleSocailLogin('apple')}
          disabled={loaders.google || loaders.apple || isPending}>
          <Flex direction="row" gap={Sizer.hSize(48)}>
            {loaders.apple ? (
              <View style={styles.loaderView}>
                <ActivityIndicator size={18} />
              </View>
            ) : (
              <Flex direction="row" gap={Sizer.hSize(12)}>
                <View style={styles.iconContainer}>
                  <Image
                    source={apple}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Typography size={16} fFamily="poppinsMedium500">
                  Continue With Apple Id
                </Typography>
              </Flex>
            )}
          </Flex>
        </TouchableOpacity>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  authMethodButton: {
    backgroundColor: COLORS.white200,
    paddingVertical: Sizer.hSize(18),
    paddingHorizontal: Sizer.hSize(17),
    borderRadius: Sizer.fS(10),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: Sizer.vSize(20),
    width: Sizer.vSize(20),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  loaderView: {
    flex: 1,
  },
});
export default SocialButtons;
