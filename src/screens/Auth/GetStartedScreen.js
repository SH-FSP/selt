import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

//------
import { Container, Flex, Typography } from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import { BASEOPACITY, COLORS } from '../../globalStyle/Theme';
import { MainLogoSvg } from '../../assets/svgs';
import { authMethods } from '../../constants/AppData';
import { email } from '../../assets/images';
import SocialButtons from '../../components/customButtons/SocialButtons';

const GetStartedScreen = ({ navigation }) => {
  return (
    <Container isTextureVisible>
      <Flex direction={'column'} algItems={'center'}>
        <MainLogoSvg />
        <Typography
          size={32}
          fFamily="interTightSemiBold600"
          textAlign="center"
          mT={40}>
          Lets Get Started
        </Typography>
        <Typography size={14} textAlign="center" mT={6} LineHeight={22}>
          Book trusted roofing services with ease – fast, reliable, and tailored to your needs.
        </Typography>
      </Flex>



      {/* <SocialButtons /> */}

      <Flex direction="column" gap={Sizer.hSize(10)} mT={20}>
        <TouchableOpacity
          activeOpacity={BASEOPACITY}
          style={styles.authMethodButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Flex direction="row" gap={Sizer.hSize(12)}>
            <View style={styles.iconContainer}>
              <Image
                source={email}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Typography size={16} fFamily="poppinsMedium500">
              Login With Email
            </Typography>
          </Flex>
        </TouchableOpacity>

        <Flex jusContent={'center'} mT={26} extraStyle={{ width: '100%' }}>
          <Typography
            fontSize={14}
            fFamily="poppinsMedium500">
            Don’t have an account?{' '}
            <Typography
              fontSize={15}
              mL={6}
              color={COLORS.primary}
              fFamily="poppinsSemiBold600"
              onPress={() => {
                navigation.navigate('SignupScreen');
              }}>
              Register Now
            </Typography>
          </Typography>
        </Flex>
      </Flex>
    </Container>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  authMethodButton: {
    backgroundColor: COLORS.white200,
    paddingVertical: Sizer.hSize(18),
    paddingHorizontal: Sizer.hSize(17),
    borderRadius: Sizer.fS(10),
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    height: Sizer.hSize(20),
    width: Sizer.hSize(20),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
