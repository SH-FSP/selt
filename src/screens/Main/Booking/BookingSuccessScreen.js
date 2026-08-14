import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//--------
import { Container } from '../../../atomComponents';
import Sizer from '../../../helpers/Sizer';
import { COLORS, FONTS } from '../../../globalStyle/Theme';
import { verified } from '../../../assets/images';

const BookingSuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <Container >
      <View style={styles.contentContainer}>
        <Image
          source={verified}
          style={styles.successImage}
          resizeMode="contain"
        />
        <Text style={[styles.successText]}>Booking Successful</Text>
        <Text style={[styles.descriptionText]}>
          We’ll send you a reminder for your upcoming booking.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.replace('DrawerTabs', { screen: 'BottomTabs', params: { screen: "Booking" } })}>
          <Text style={[styles.buttonText, { color: COLORS.primary }]}>
            View Bookings
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
    // backgroundColor: COLORS.black200
  },
  successImage: {
    width: Sizer.vSize(145),
    height: Sizer.vSize(145),
    marginBottom: Sizer.hSize(3),
  },
  successText: {
    fontSize: Sizer.fS(28),
    fontFamily: FONTS.interTightSemiBold600,
    textAlign: 'center',
    marginBottom: Sizer.hSize(3),
    marginTop: Sizer.hSize(35),
    color: COLORS.primary
  },
  descriptionText: {
    fontSize: Sizer.fS(14),
    textAlign: 'center',
    fontFamily: FONTS.poppinsMedium500,
    marginBottom: Sizer.hSize(23),
    color: COLORS.primary,
  },
  button: {
    paddingVertical: Sizer.hSize(2),
    paddingHorizontal: Sizer.vSize(8),
    borderRadius: Sizer.vSize(3),
  },
  buttonText: {
    fontSize: Sizer.fS(18),
    fontFamily: FONTS.poppinsBold700,
    textAlign: 'center',
  },
});

export default BookingSuccessScreen;
