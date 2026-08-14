import { Dimensions } from 'react-native';
import Sizer from '../helpers/Sizer';

const BASEOPACITY = 0.5;

const IMAGEONLOADCOLOR = {
  backgroundColor: 'lightgrey',
};

const COLORS = {
  mainBg: '#FFFFFF',
  primary: '#152E77',
  primary100: '#D8A44A',
  secondary: '#001D3F',

  //Blue Variants:
  blue100: '#010D7C',
  blue200: '#000855',

  //Green Variants:

  //Black Variants:
  black100: '#000000',
  black200: '#1A1A1A',
  black300: '#212121',
  black400: '#424242',
  black500: '#303030',

  //Grey Variants:
  grey100: '#C8C8C8',
  grey200: '#B1B1B1',
  grey300: '#989898',
  grey400: '#B1B1B1',
  grey500: '#818181',

  //White Variants:
  white100: '#FFFFFF',
  white200: '#F8F8F8',
  white300: '#F6F8FF',

  red: '#f3080bff',
  green: '#1b8567',
  yellow: '#E9C80D',
};

const FONTS = {
  //Font 01

  //Poppins
  poppinsRegular400: 'Poppins-Regular',
  poppinsMedium500: 'Poppins-Medium',
  poppinsSemiBold600: 'Poppins-SemiBold',
  poppinsBold700: 'Poppins-Bold',

  //Font 02
  //Inter Tight
  interTightSemiBold600: 'InterTight-SemiBold',
  interTightBold700: 'InterTight-Bold',

  //Font 03
  //Inter
  interSemiBold600: 'Inter-SemiBold',
};

const WINDOW = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  fixPadding: 24,
};

const GLOBALSTYLE = {
  wrap: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  paddingHor: {
    paddingHorizontal: Sizer.hSize(24),
  },
  checkBoxWrapper: {
    width: Sizer.hSize(24),
    height: Sizer.hSize(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizer.hSize(10),
    overflow: 'hidden',
  },
  listBottomPadding: {
    paddingBottom: Sizer.vSize(100),
  },
  topListBottomMargin: {
    marginBottom: Sizer.vSize(194),
  },
  itemSeparatorVertically: {
    height: Sizer.vSize(16),
  },
  itemSeparatorHorizontally: {
    height: Sizer.vSize(10),
  },
  bgWithOpacity: (opacity = 0.3) => `rgba(0, 0, 0, ${opacity})`,
};

export { COLORS, WINDOW, FONTS, GLOBALSTYLE, BASEOPACITY, IMAGEONLOADCOLOR };
