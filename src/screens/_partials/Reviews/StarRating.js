import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Sizer from '../../../helpers/Sizer';
import {useState} from 'react';
import Icon from '../../../helpers/Icon';
import {COLORS} from '../../../globalStyle/Theme';

const StarRating = ({
  size = 32,
  ratingMargin = 12,
  starColor = COLORS.secondary,
  allowRate = false,
  ratingStar = 0,
  onPressRating = () => {},
  marginTop = 24,
}) => {
  return (
    <View style={{...styles.starContainer, marginTop}}>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            onPress={() => allowRate && onPressRating(currentRating)}
            style={{marginRight: Sizer.vSize(ratingMargin || 2)}}>
            <Icon
              name={ratingStar >= currentRating ? 'star' : 'star-o'}
              size={Sizer.vSize(size)}
              color={starColor}
              iconFamily={'FontAwesome'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    // marginTop: 24,
  },
});

export default StarRating;
