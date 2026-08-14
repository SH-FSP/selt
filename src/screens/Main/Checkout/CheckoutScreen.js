import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
//-------
import { Container, Flex, Typography } from '../../../atomComponents';
import { Button, Header, TextField } from '../../../components';
import {
  BASEOPACITY,
  COLORS,
  GLOBALSTYLE,
  WINDOW,
} from '../../../globalStyle/Theme';
import { Divider } from 'react-native-paper';
//----------
import Sizer from '../../../helpers/Sizer';
import { useCustomMutation } from '../../../query/useCustomMutation';
import {
  fetchPaymentIntent,
  handlePaymentSuccess,
} from '../../../api/bookingService';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import { showMessage } from '../../../utils';
import StarRating from '../../_partials/Reviews/StarRating';
import Icon from '../../../helpers/Icon';

const CheckoutScreen = ({ navigation, route }) => {
  const serviceDetail = route.params?.serviceDetail;
  const selectedApopintmentType = route.params?.selected;
  const bookingStatus = route?.params?.selected;

  const isPayButtonDisable =
    serviceDetail?.payment_status === 'unpaid' &&
      serviceDetail?.status === 'confirmed'
      ? false
      : true;

  const reviews = serviceDetail?.reviews;

  //Custom Mutation Hook:
  const { mutate: handlePaySuccess, isPending: isLoadingPaymentSuccess } =
    useCustomMutation({
      mutationFn: handlePaymentSuccess,
      onSuccess: ({ data }) => {
        if (data.status) {
          showMessage({
            message: data?.message,
            type: 'success',
          });
          navigation.replace('PaymentSuccessScreen');
        } else {
          showMessage({
            message: data?.message,
            type: 'danger',
          });
        }
      },
    });

  const { mutate: pI, isPending: isLoadingPaymentIntent } = useCustomMutation({
    mutationFn: fetchPaymentIntent,
    onSuccess: async ({ data }) => {
      const clientSecret = data?.client_secret;
      const paymentIntent = data?.payment_intent_id;
      // for stripe
      if (clientSecret) {
        const { error: paymentSheetError } = await initPaymentSheet({
          merchantDisplayName: 'West Coast Roofers',
          paymentIntentClientSecret: clientSecret,
        });

        if (paymentSheetError) {
          console.log('paymentSheetError', paymentSheetError);
          return;
        }

        const { error: paymentError } = await presentPaymentSheet();

        if (paymentError) {
          return;
        }

        handlePaySuccess(paymentIntent);
      }
    },
    onError: () => {
      Platform.OS === 'android'
        ? ToastAndroid.show(
          'Error While Payment Proceeding.',
          ToastAndroid.LONG,
        )
        : Alert.alert('Payment Status', 'Error While Payment Proceeding.');
    },
  });

  const handleProceedPayment = async () => {
    pI(serviceDetail?.id); //paymemnt intemt
  };

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header
        type="app"
        title="Check Out"
        onPressRight={() =>
          navigation.navigate('BookingChatScreen', {
            booking_id: serviceDetail?.id,
            bookingStatus: bookingStatus,
          })
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentStyle}
      >
        <View
          style={{
            ...styles.contentWrapper,
            backgroundColor: COLORS.white300,
          }}
        >
          <TimeAndDes item={serviceDetail} />
          <Divider bold style={styles.dividerSt} />

          <ServicesList service={serviceDetail?.service} />

          <Flex flexStyle={styles.dividerWrapper} algItems={'center'}>
            <View style={styles.circleSt} />
            <View style={{ ...styles.dashDivider, borderColor: '#D1D5DB' }} />
            <View style={styles.circleSt} />
          </Flex>

          <AmountComp
            originalPrice={serviceDetail?.original_price}
            discount={serviceDetail?.discount}
            totalPrice={serviceDetail?.discount_price}
          />
        </View>
        {selectedApopintmentType !== 'previous' && (
          <>
            {serviceDetail?.payment_status == 'unpaid' &&
              serviceDetail?.status == 'confirmed' ? (
              <Button
                type={null}
                label={'Pay Now'}
                mt={20}
                loader={isLoadingPaymentIntent || isLoadingPaymentSuccess}
                disabled={isPayButtonDisable}
                onPress={handleProceedPayment}
              />
            ) : serviceDetail?.payment_status == 'unpaid' &&
              serviceDetail?.status == 'pending' ? (
              <Flex algItems={'flex-start'} gap={8} mT={16}>
                <Icon
                  name={'info'}
                  iconFamily={'Feather'}
                  size={14}
                  color={COLORS.green}
                  style={{ marginTop: 4 }}
                />
                <Typography color={COLORS.grey500}>
                  You will be able to pay against booking once your booking is
                  confirmed
                </Typography>
              </Flex>
            ) : null}
          </>
        )}

        {serviceDetail?.status === 'completed' && !reviews?.length ? (
          <Button
            type="secondary"
            label="Post Reviews"
            mt={20}
            onPress={() =>
              navigation.replace('PostReviewScreen', {
                booking_id: serviceDetail?.id,
              })
            }
          />
        ) : serviceDetail?.status === 'completed' && reviews?.length ? (
          <TouchableOpacity activeOpacity={BASEOPACITY} style={styles.review}>
            <Icon
              name="reviews"
              iconFamily="MaterialIcons"
              size={14}
              color={COLORS.green}
            />
            <Typography color={COLORS.green}>Reviewed by You</Typography>
            <StarRating
              size={12}
              ratingMargin={2}
              starColor="#ffcda5"
              ratingStar={reviews?.[0]?.star}
              marginTop={0}
            />
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </Container>
  );
};

const TimeAndDes = ({ item }) => {
  return (
    <View style={[GLOBALSTYLE.paddingHor, styles.sectionSpace]}>
      <Flex jusContent={'space-between'} mB={20} gap={16}>
        <View style={styles.descWrapper}>
          <Typography >Date</Typography>
          <Typography color={COLORS.primary} fFamily="poppinsSemiBold600" mT={8}>
            {item?.booking_date || 'N/A'}
          </Typography>
        </View>

        <View style={styles.descWrapper}>
          <Typography >Slot</Typography>
          <Typography color={COLORS.primary} fFamily="poppinsSemiBold600" mT={8}>
            {item?.slot || 'N/A'}
          </Typography>
        </View>
      </Flex>

      <Flex jusContent={'space-between'} mB={20} gap={16}>
        <View style={styles.descWrapper}>
          <Typography >Service</Typography>
          <Typography
            color={COLORS.primary}
            fFamily="poppinsSemiBold600"
            textTransform={'capitalize'}
            mT={8}
          >
            {item?.service?.name || 'N/A'}
          </Typography>
        </View>
        <View style={styles.descWrapper}>
          <Typography >Duration</Typography>
          <Typography color={COLORS.primary} fFamily="poppinsSemiBold600" mT={8}>
            {item?.service?.slot ? `${item.service.slot} mins` : 'N/A'}
          </Typography>
        </View>
      </Flex>

      <Flex jusContent={'space-between'} mB={20} gap={16}>
        <View style={styles.descWrapper}>
          <Typography color={COLORS.darkV1}>Payment Status</Typography>
          <Typography
            color={COLORS.primary}
            fFamily="poppinsSemiBold600"
            mT={8}
            textTransform={'capitalize'}
          >
            {item?.payment_status || 'N/A'}
          </Typography>
        </View>
        <View style={styles.descWrapper}>
          <Typography color={COLORS.darkV1}>Total Price</Typography>
          <Typography
            color={COLORS.primary}
            fFamily="poppinsSemiBold600"
            mT={8}
          >
            {item?.discount_price || 'N/A'}
          </Typography>
        </View>
      </Flex>
      {/* 
      {item?.note && (
        <View style={styles.descWrapper}>
          <Typography color={COLORS.darkV1}>Note</Typography>
          <Typography
            color={COLORS.primary}
            fFamily="poppinsSemiBold600"
            mT={8}>
            {item?.note}
          </Typography>
        </View>
      )} */}
    </View>
  );
};

const ServicesList = ({ service }) => {
  return (
    <View style={[GLOBALSTYLE.paddingHor, styles.sectionSpace]}>
      <Typography textAlign="center" mB={16} >
        Services
      </Typography>

      <Flex jusContent={'space-between'} algItems={'center'}>
        <Typography fFamily="poppinsMedium500" >
          {service?.name || 'N/A'}
        </Typography>
        <Typography fFamily="poppinsSemiBold600" color={COLORS.primary}>
          {service?.price || 'N/A'}
        </Typography>
      </Flex>

      {service?.description && (
        <Typography color={COLORS.grey200} mT={8} fontSize={12}>
          {service.description}
        </Typography>
      )}
    </View>
  );
};

const AmountComp = ({ originalPrice, discount, totalPrice }) => {
  return (
    <View style={[GLOBALSTYLE.paddingHor, styles.sectionSpace]}>
      <Flex jusContent={'space-between'} algItems={'center'} mB={20}>
        <Typography color={COLORS.black200}>Sub Total</Typography>
        <Typography color={COLORS.primary} fFamily="poppinsSemiBold600">
          {originalPrice || 'N/A'}
        </Typography>
      </Flex>
      <Flex jusContent={'space-between'} algItems={'center'} mB={20}>
        <Typography color={COLORS.black200}>Discount</Typography>
        <Typography color={COLORS.primary} fFamily="poppinsSemiBold600">
          {discount ? `${discount}%` : '$0'}
        </Typography>
      </Flex>
      <Flex jusContent={'space-between'} algItems={'center'}>
        <Typography color={COLORS.black200}>Total</Typography>
        <Typography color={COLORS.primary} fFamily="poppinsSemiBold600">
          {' '}
          {totalPrice || 'N/A'}
        </Typography>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginTop: Sizer.vSize(27),
  },
  contentStyle: {
    marginHorizontal: Sizer.hSize(24),
    marginTop: Sizer.vSize(36),
    borderRadius: Sizer.vSize(10),
    paddingBottom: 250,
  },
  mainContainer: {
    paddingVertical: Sizer.hSize(16),
  },
  contentWrapper: {
    borderRadius: 15,
  },
  descWrapper: {
    flex: 1,
  },
  sectionSpace: {
    paddingVertical: Sizer.hSize(24),
  },
  dividerSt: {
    marginHorizontal: WINDOW.fixPadding,
    backgroundColor: '#D1D5DB',
  },
  circleSt: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  dividerWrapper: {
    marginHorizontal: -15,
  },
  dashDivider: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  review: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
});

export default CheckoutScreen;
