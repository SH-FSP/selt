import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//-------
import { Flex, Typography } from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import { BASEOPACITY, COLORS } from '../../globalStyle/Theme';
import Icon from '../../helpers/Icon';
import { discountedPrice } from '../../utils';
import StarRating from '../../screens/_partials/Reviews/StarRating';

const BookingItem = ({ item, onPressCard }) => {
  const { salePrice } = discountedPrice(
    item?.service?.price,
    item?.service?.discount,
  );

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={BASEOPACITY}
      onPress={onPressCard}
      style={{
        backgroundColor: COLORS.white300,
        borderRadius: Sizer.hSize(12),
        paddingHorizontal: Sizer.vSize(20),
        paddingVertical: Sizer.hSize(20),
      }}>
      <Flex jusContent="space-between" algItems="center" mB={15}>
        <Typography size={12} color={COLORS.grey500} fFamily="poppinsMedium500">
          Booking ID #{item?.id}
        </Typography>
        {/* <Typography size={18} color={COLORS.primary} fFamily="poppinsBold700">
          ${salePrice}
        </Typography> */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: Sizer.vSize(5),
            alignSelf: 'flex-end',
            padding: Sizer.vSize(3),
            paddingHorizontal: Sizer.vSize(8),
          }}>
          <Typography
            size={12}
            color={COLORS.white100}
            fFamily="poppinsMedium500"
            textTransform={'capitalize'}>
            {item?.status}
          </Typography>
        </View>
      </Flex>

      {/* Date and Time */}
      <Flex
        jusContent="space-between"
        direction={'column'}
        gap={8}
        {...(item?.status == 'completed' ? { direction: 'column' } : {})}>
        <Flex algItems="center" gap={4}>
          <Icon
            name="calendar"
            size={Sizer.fS(18)}
            color={COLORS.primary}
            iconFamily={'MaterialCommunityIcons'}
          />
          <Typography
            size={14}
            color={COLORS.primary}
            fFamily="poppinsMedium400" mR={8}>
            Date:
          </Typography>
          <Typography size={16} fFamily="poppinsMedium500">
            {item?.booking_date}
          </Typography>
        </Flex>

        <Flex algItems="center" gap={4}>
          <Icon
            name="clock-time-two"
            size={Sizer.fS(18)}
            color={COLORS.primary}
            iconFamily={'MaterialCommunityIcons'}
          />
          <Typography
            size={14}
            fFamily="poppinsMedium500"
            color={COLORS.primary}
            mR={8}>
            Time:
          </Typography>
          <Typography size={16} fFamily="poppinsMedium500">
            {item?.slot}
          </Typography>
        </Flex>
      </Flex>

      {/* Services */}
      {/* <View style={{gap: Sizer.hSize(8)}}>
        {services.map((service, index) => ( */}
      {/* ))} */}

      <Flex algItems="center" gap={8} mT={8}>
        <Icon
          name="home-repair-service"
          size={Sizer.fS(20)}
          color={COLORS.primary}
          iconFamily={'MaterialIcons'}
        />
        <Typography
          size={16}
          color={COLORS.primary}
          fFamily="poppinsMedium500"
          mR={4}>
          Service {String(1).padStart(2, '0')}:
        </Typography>
        <Typography
          size={16}
          fFamily="poppinsMedium500"
          numberOfLines={1}
          style={{ flex: 1 }}>
          {item?.service?.name}
        </Typography>
      </Flex>

      {item?.status == 'completed' && (
        <TouchableOpacity
          activeOpacity={BASEOPACITY}
          disabled={!!item?.reviews?.length}
          style={styles.review}
          onPress={() =>
            navigation.navigate('PostReviewScreen', { booking_id: item?.id })
          }>
          <Icon
            name={'reviews'}
            iconFamily={'MaterialIcons'}
            size={14}
            color={COLORS.green}
          />
          <Typography color={COLORS.green}>
            {item?.reviews?.length ? 'Reviewed by You' : 'Provide Reviews'}
          </Typography>
          {item?.reviews?.length > 0 && (
            <StarRating
              size={12}
              ratingMargin={2}
              starColor={'#ffcda5'}
              ratingStar={item?.reviews?.[0]?.star}
              marginTop={0}
            />
          )}
        </TouchableOpacity>
      )}
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  review: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
});

export default BookingItem;
