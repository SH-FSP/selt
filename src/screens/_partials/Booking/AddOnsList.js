import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Flex, Typography} from '../../../atomComponents';
import {BASEOPACITY, COLORS} from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import {checkedaddon, uncheckaddon} from '../../../assets/images';

const AddOnsList = ({addonsData = [], onSelectAdOn, selectedAddon}) => {
  return (
    <View>
      {addonsData?.map((item, index) => {
        const isSelected = selectedAddon?.name === item.name;

        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              onSelectAdOn(prevAdon => (prevAdon?.name == item?.name ? null : item))
            }
            activeOpacity={BASEOPACITY}>
            <Flex
              mT={index === 0 ? 13 : 12}
              jusContent="space-between"
              extraStyle={{
                backgroundColor: isSelected
                  ? COLORS.secondary
                  : COLORS.white300,
                ...styles.addOnStyle,
              }}>
              <Typography
                color={isSelected ? 'white' : 'black'}
                fFamily="poppinsMedium500"
                textTransform={'capitalize'}>
                {item.name}
              </Typography>

              <Flex algItems={'center'}>
                <Typography
                  color={isSelected ? 'white' : 'black'}
                  fFamily="poppinsSemiBold600">
                  ({item.price})
                </Typography>

                <Image
                  source={isSelected ? checkedaddon : uncheckaddon}
                  style={{
                    width: Sizer.hSize(24),
                    height: Sizer.hSize(24),
                    marginLeft: 8,
                  }}
                  resizeMode="contain"
                />
              </Flex>
            </Flex>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  addOnStyle: {
    paddingVertical: Sizer.vSize(12),
    paddingHorizontal: Sizer.vSize(10),
    borderRadius: Sizer.fS(10),
  },
});
export default AddOnsList;
