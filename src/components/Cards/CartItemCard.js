import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//----
import { Flex, Typography } from '../../atomComponents';
import { COLORS } from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import { service01 } from '../../assets/images';
import { discountedPrice } from '../../utils';

const CartItemCard = ({ item, hide = true }) => {
  const { salePrice } = discountedPrice(item?.price, item?.discount);

  return (
    <Flex flexStyle={styles.cardWraper} algItems={'center'}>
      <Flex algItems={'center'} gap={10}>
        <View
          style={{
            height: Sizer.vSize(64),
            width: Sizer.vSize(64),
            overflow: 'hidden',
            borderRadius: Sizer.hSize(10),
          }}>
          <Image
            source={{ uri: item?.image }}
            resizeMode={'cover'}
            style={{ height: '100%', width: '100%' }}
          />
        </View>
        <Flex direction={'column'} flex={1}>
          <Typography
            fFamily="poppinsMedium500"
            size={16}
            textTransform={'capitalize'}>
            {item?.name}
          </Typography>
          <Typography
            fFamily="poppinsSemiBold600"
            size={16}
            color={COLORS.primary}
            mT={4}>
            ${salePrice}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  cardWraper: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    // backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    padding: 6,
  },

  fabStyle: {
    width: Sizer.vSize(70),
    height: Sizer.hSize(60),
    zIndex: 2,
  },
});
export default CartItemCard;
