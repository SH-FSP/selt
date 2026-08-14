import React from 'react';
import { Divider } from 'react-native-paper';
//------
import { COLORS } from '../../../globalStyle/Theme';
import { Flex, Typography } from '../../../atomComponents';
import { StyleSheet, View } from 'react-native';
import Sizer from '../../../helpers/Sizer';

const ServiceSummary = ({
  salePrice,
  actualPrice,
  dataTime,
  discountedAmount,
  discount,
}) => {
  const isSale = salePrice < actualPrice;

  return (
    <Flex direction="column" gap={14} flex={1} mT={15} >
      <Flex
        direction="row"
        jusContent="space-between"
        algItems="center"
        flex={1}
        extraStyle={{ width: '100%' }}>
        <Typography
          size={14}
          color={COLORS.black200}
          fFamily="poppinsRegular400">
          Total Services
        </Typography>
        <Typography
          size={14}
          fFamily="poppinsSemiBold600">
          1 Service
        </Typography>
      </Flex>
      <Divider style={styles.separator} />
      {dataTime && (
        <>
          <Flex
            direction="row"
            jusContent="space-between"
            algItems="center"
            extraStyle={{ width: '100%' }}>
            <Typography
              size={14}
              color={COLORS.black200}
              fFamily="poppinsRegular400"
              extraStyle={{ width: '100%' }}>
              Date & Time
            </Typography>
            <Typography
              size={14}
              color={COLORS.black200}
              fFamily="poppinsSemiBold600">
              {dataTime}
            </Typography>
          </Flex>
          <Divider style={styles.separator} />
        </>
      )}
      {isSale && (
        <>
          <Flex
            direction="row"
            jusContent="space-between"
            algItems="center"
            extraStyle={{ width: '100%' }}>
            <Typography
              size={14}
              color={COLORS.black200}
              fFamily="poppinsRegular400">
              Sub Total
            </Typography>
            <Typography
              size={14}
              color={COLORS.black200}
              fFamily="poppinsSemiBold600">
              ${actualPrice}
            </Typography>
          </Flex>
          <Divider style={styles.separator} />
        </>
      )}

      {isSale && (
        <>
          <Flex
            direction="row"
            jusContent="space-between"
            algItems="center"
            extraStyle={{ width: '100%' }}>
            <Typography
              size={14}
              color={COLORS.black200}
              fFamily="poppinsRegular400">
              Discount {discount}%
            </Typography>
            <Typography
              size={14}
              color={COLORS.red500}
              fFamily="poppinsSemiBold600">
              ${discountedAmount?.toFixed(2)}
            </Typography>
          </Flex>
          <Divider style={styles.separator} />
        </>
      )}

      <Flex
        direction="row"
        jusContent="space-between"
        algItems="center"
        extraStyle={{ width: '100%' }}>
        <Typography size={18} color={COLORS.black200} fFamily="poppinsBold700">
          Grand Total
        </Typography>
        <Typography size={18} color={COLORS.green} fFamily="poppinsBold700">
          ${salePrice}
        </Typography>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E9E6E6',
    height: 2,
    width: '100%',
  },
});
export default ServiceSummary;
