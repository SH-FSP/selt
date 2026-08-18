import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { mainLogoRed, mainLogoWhite } from '../assets/images';
import Sizer from '../helpers/Sizer';

/**
 * Brand wordmark.
 * - red: light backgrounds (auth, forms)
 * - white: dark / primary / splash backgrounds
 */
const BrandLogo = ({
  variant = 'red',
  width = Sizer.hSize(182),
  height = Sizer.vSize(85),
  style,
}) => (
  <Image
    source={variant === 'white' ? mainLogoWhite : mainLogoRed}
    style={[styles.logo, { width, height }, style]}
    resizeMode="contain"
    accessibilityLabel="Storey Enterprises Logistics & Transport"
  />
);

export default BrandLogo;

const styles = StyleSheet.create({
  logo: {
    maxWidth: '100%',
  },
});
