import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Sizer from '../../helpers/Sizer';
import { BASEOPACITY, COLORS, FONTS } from '../../globalStyle/Theme';
import Flex from '../../atomComponents/Flex';

function Button({
  label = 'Custom Button',
  btnStyle = '',
  textStyle = '',
  loader = false,
  disabled = false,
  upperCase = false,
  onPress = () => { },
  icon = false,
  rightIcon = false,
  type = 'defualt',
  mb = 0,
  mt = 0,
  iconGap = 8,
  fontSize = 18,
  fontFamily = FONTS.poppinsSemiBold600,
  bgColor = null,
  textColor = null,
  loadColor = null,
  ...props
}) {
  let defaultBgColor;
  let defaultTextColor = COLORS.white100;
  let loaderColor = loadColor || COLORS.white100;
  let borderColor = COLORS.white100;
  let borderWidth = 0;

  if (type === 'primary') {
    defaultBgColor = disabled ? COLORS.grey100 : COLORS.primary;
  } else if (type === 'secondary') {
    defaultBgColor = disabled ? COLORS.grey100 : COLORS.primary;
    defaultTextColor = COLORS.white100;
  } else {
    defaultBgColor = COLORS.primary100;
    defaultTextColor = COLORS.white100;
  }

  const backgroundColor = bgColor || defaultBgColor;
  const color = textColor || defaultTextColor;

  const styles = {
    btn: {
      borderRadius: Sizer.fS(10),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Sizer.vSize(13),
      paddingHorizontal: Sizer.hSize(12),
      borderColor: borderColor,
      borderWidth: borderWidth,
    },
    btnTextStyle: {
      fontFamily: fontFamily,
      fontSize: Sizer.fS(fontSize),
      textAlign: 'center',
      textTransform: upperCase ? 'uppercase' : 'capitalize',
    },
  };

  return (
    <TouchableOpacity
      disabled={loader || disabled}
      activeOpacity={BASEOPACITY}
      style={[
        styles.btn,
        {
          backgroundColor: backgroundColor,
          marginBottom: Sizer.vSize(mb),
          marginTop: Sizer.vSize(mt),
        },
        btnStyle,
      ]}
      onPress={onPress}
      {...props}
    >
      {loader ? (
        <ActivityIndicator
          size={Sizer.fS(20)}
          style={{ paddingVertical: 5 }}
          color={loaderColor}
        />
      ) : (
        <Flex gap={iconGap} algItems="center">
          {!!icon && icon}
          <Text style={[styles.btnTextStyle, { color: color }, textStyle]}>
            {label}
          </Text>
          {!!rightIcon && rightIcon}
        </Flex>
      )}
    </TouchableOpacity>
  );
}

export default Button;
