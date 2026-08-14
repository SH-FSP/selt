import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { BASEOPACITY, COLORS, FONTS } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';

const AppointmentSlotsComponent = ({
  item,
  setActiveSlot,
  activeSlot,
  newSlot = false,
}) => {
  let slotTime;

  // console.log(item, activeSlot === item );

  return (
    <TouchableOpacity
      activeOpacity={BASEOPACITY}
      onPress={() => setActiveSlot(item)}
      style={[
        styles.slotsBox,
        {
          backgroundColor:
            activeSlot === item ? 'transparent' : COLORS.white100,
          borderColor: activeSlot === item ? COLORS.primary : '#ADB3BC',
          marginLeft: newSlot ? 5 : 0,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.slotText,
          {
            color: activeSlot === item ? COLORS.primary : COLORS.black300,
          },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(AppointmentSlotsComponent);

const styles = StyleSheet.create({
  slotsBox: {
    flex: 0.48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Sizer.fS(2),
    marginBottom: 12,
    paddingVertical: Sizer.vSize(7),
  },
  slotText: {
    fontSize: Sizer.vSize(13),
    fontFamily: FONTS.poppinsMedium500,
    textAlign: 'center',
  },
});
