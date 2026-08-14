import { StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import Sizer from '../../../helpers/Sizer';
import { Typography } from '../../../atomComponents';
import { COLORS } from '../../../globalStyle/Theme';

const BookingTypeSelector = ({
  data,
  onSetBookingType,
  bookingTypeSelector,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: data?.length > 2 ? 'space-between' : 'flex-start',
        gap: 12,
      }}
      contentContainerStyle={{ marginTop: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSetBookingType(item.id)}
          style={[
            styles.bookingTypeItem,
            bookingTypeSelector == item.id && {

              borderColor: COLORS.primary,
              ...styles.shadow,
            },
          ]}
        >
          <Image source={{ uri: item?.image }} style={styles.serviceCatImage} />
          <Typography
            fFamily="poppinsMedium500"
            numberOfLines={1}
            textTransform={'capitalize'}
            size={12}
            mT={11}
            color={bookingTypeSelector == item.id ? COLORS.primary : COLORS.grey300}
          >
            {item?.name}
          </Typography>
        </TouchableOpacity>
      )}
    />
  );
};

export default BookingTypeSelector;

const styles = StyleSheet.create({
  bookingTypeItem: {
    width: '28%',
    height: Sizer.hSize(105),
    alignItems: 'center',
    // backgroundColor: COLORS.white300,
    paddingVertical: Sizer.vSize(16),
    borderRadius: Sizer.vSize(10),
    marginHorizontal: 5,
    borderColor: COLORS.grey300,
    borderWidth: Sizer.fS(1),
  },
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceCatImage: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.grey300
  },
});
