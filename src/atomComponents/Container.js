import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';

import { COLORS, GLOBALSTYLE } from '../globalStyle/Theme';
import { appTexture, SplashBg } from '../assets/images';
import Sizer from '../helpers/Sizer';

const Container = ({
  children,
  isTextureVisible = false,
  conStyle = {},
  isPadding = true,
  isPaddingVertical = true,
  isKeyboardAvoid = false,
  textureSoruce = null
}) => {
  const ContentWrapper = isTextureVisible ? ImageBackground : View;
  const contentProps = isTextureVisible
    ? {
      source: textureSoruce ?? appTexture,
      resizeMode: 'cover',
      style: [
        styles.container,
        isPadding && GLOBALSTYLE.paddingHor,
        conStyle,
        isPaddingVertical && {
          paddingTop: Sizer.vSize(70),
        },
      ],
    }
    : {
      style: [
        styles.container,
        isPadding && GLOBALSTYLE.paddingHor,
        conStyle,
        isPaddingVertical && {
          paddingTop: Sizer.vSize(70),
        },
      ],
    };

  const innerContent = <View style={conStyle}>{children}</View>;

  const wrappedContent = isTextureVisible ? (
    <ContentWrapper {...contentProps}>{innerContent}</ContentWrapper>
  ) : (
    <ContentWrapper {...contentProps}>{children}</ContentWrapper>
  );

  if (isKeyboardAvoid) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-100}>
        {wrappedContent}
      </KeyboardAvoidingView>
    );
  }

  return wrappedContent;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
});
