import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
//-------------
import { Flex, Typography } from '../../atomComponents';
import Icon from '../../helpers/Icon';
import { BASEOPACITY, COLORS, WINDOW } from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import { MainLogoSvg } from '../../assets/svgs';
import MainLogoSvgGreyed from '../../assets/svgs/MainLogoSvgGreyed';
import HamBurgerSvg from '../../assets/svgs/HamBurgerSvg';
import BellSvg from '../../assets/svgs/BellSvg';
import HomeHeaderLineSvg from '../../assets/svgs/HomeHeaderLineSvg';
// import {edit} from '../../assets/images';

const Header = ({
  type = '',
  title = '',
  onPresBack = null,
  isBackVisible = true,
  iconColor = COLORS.white100,
  isEdit,
  onEditPress,
  profileEidtState,
  appIconStyles = {},
  isBackGreen,
  centerType = null,
  onPressRight = null,
  CenterComponent = null,
  ...titleStyles
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {type == 'home' ? (
        <View style={styles.HomeHeaderStyle}>
          <Flex
            jusContent={'space-around'}
            flex={1}
            algItems={'flex-end'}
            mB={14}
          >
            <HamBurgerSvg onPress={() => navigation.toggleDrawer()} />
            <MainLogoSvgGreyed />
            <BellSvg
              onPress={() => navigation.navigate('NotificationScreen')}
            />
          </Flex>
          <HomeHeaderLineSvg style={{ alignSelf: 'center' }} />
        </View>
      ) : type == 'app' ? (
        <Flex
          jusContent={'center'}
          extraStyle={{
            backgroundColor: COLORS.primary,
            width: '100%',
            paddingTop: Sizer.vSize(60),
            position: 'relative',
            borderBottomLeftRadius: Sizer.fS(24),
            borderBottomRightRadius: Sizer.fS(24),
          }}
        >
          <TouchableOpacity
            activeOpacity={BASEOPACITY}
            onPress={onPresBack ?? (() => navigation.goBack())}
            style={{
              padding: Sizer.fS(8),
              backgroundColor: COLORS.secondary,
              borderRadius: 100,
              position: 'absolute',
              left: Sizer.hSize(24),
              top: Sizer.vSize(60),
            }}
          >
            <Icon
              color={iconColor}
              iconFamily={'Ionicons'}
              size={Sizer.vSize(20)}
              name={'arrow-back'}
            />
          </TouchableOpacity>

          <Typography
            size={26}
            mB={26}
            color="white"
            fFamily="interSemiBold600"
          >
            {title}
          </Typography>
        </Flex>
      ) : (
        <View
          style={{
            marginTop: Sizer.vSize(24),
            width: '100%',
            minHeight: Sizer.hSize(36),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isBackVisible && (
            <TouchableOpacity
              activeOpacity={BASEOPACITY}
              onPress={onPresBack ?? (() => navigation.goBack())}
              style={[
                styles.backButton,
                {
                  backgroundColor: isBackGreen
                    ? COLORS.secondary
                    : COLORS.primary,
                  // Center vertically within the row
                  top: '50%',
                  marginTop: -Sizer.vSize(18), // Half of back button height (approx 36)
                },
              ]}
            >
              <Icon
                color={iconColor}
                iconFamily={'Ionicons'}
                size={Sizer.vSize(20)}
                name={'arrow-back'}
              />
            </TouchableOpacity>
          )}

          <View style={styles.centeredContent}>
            {CenterComponent ? (
              CenterComponent
            ) : (
              <Typography size={24} fFamily="abrilRegular400" {...titleStyles}>
                {title}
              </Typography>
            )}
          </View>
        </View>
      )}

      {onPressRight && (
        <TouchableOpacity
          activeOpacity={BASEOPACITY}
          style={{
            borderRadius: Sizer.vSize(30),
            padding: Sizer.fS(10),
            backgroundColor: COLORS.secondary,
            position: 'absolute',
            right: Sizer.hSize(24),
            top: Sizer.vSize(60),
          }}
          onPress={onPressRight}
        >
          <Entypo name="chat" size={Sizer.fS(18)} color={COLORS.white100} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    // backgroundColor:'red'
  },
  HomeHeaderStyle: {
    width: '100%',
    backgroundColor: COLORS.blue100,
    // paddingTop: Sizer.vSize(32),
    borderBottomLeftRadius: Sizer.fS(24),
    borderBottomRightRadius: Sizer.fS(24),
    height: Sizer.vSize(144),
  },
  backButton: {
    position: 'absolute',
    left: Sizer.vSize(0),
    padding: Sizer.fS(8),
    borderRadius: 100,
    zIndex: 100,
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
