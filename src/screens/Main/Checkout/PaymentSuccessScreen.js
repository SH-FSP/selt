import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//---
import {COLORS, FONTS} from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import {Container} from '../../../atomComponents';
import {paymentsuccess} from '../../../assets/images';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <Container isPaddingVertical={false}>
      <View style={styles.contentContainer}>
        <Image
          source={paymentsuccess}
          style={styles.successImage}
          resizeMode="contain"
        />
        <Text style={[styles.successText, {color: COLORS.darkV1}]}>
          Booking Successful!{' '}
        </Text>
        <Text style={[styles.descriptionText, {color: COLORS.darkV2}]}>
          We’ll send you a reminder for your upcoming booking.
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.replace('DrawerTabs', {screen: 'BottomTabs'})
          }>
          <Text style={[styles.buttonText, {color: COLORS.secondary}]}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizer.vSize(5),
  },
  successImage: {
    width: Sizer.vSize(250),
    height: Sizer.vSize(250),
    marginBottom: Sizer.hSize(3),
  },
  successText: {
    fontSize: Sizer.fS(32),
    fontFamily: FONTS.interTightSemiBold600,
    textAlign: 'center',
    marginBottom: Sizer.hSize(1),
  },
  descriptionText: {
    fontSize: Sizer.fS(14),
    textAlign: 'center',
    fontFamily: FONTS.poppinsRegular400,
    marginBottom: Sizer.hSize(23),
  },
  button: {
    paddingVertical: Sizer.hSize(2),
    paddingHorizontal: Sizer.vSize(8),
    borderRadius: Sizer.vSize(3),
  },
  buttonText: {
    fontSize: Sizer.fS(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentSuccessScreen;
