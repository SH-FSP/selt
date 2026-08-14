import React, { useEffect } from 'react';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '../atomComponents';
import { CLIENT_PROFILE } from '../constants/clientProfile';
import { COLORS } from '../globalStyle/Theme';
import Sizer from '../helpers/Sizer';
import HomeSvg from '../assets/svgs/HomeSvg';
import BookingSvg from '../assets/svgs/BookingSvg';
import ChatSvg from '../assets/svgs/ChatSvg';
import ProfileSvg from '../assets/svgs/ProfileSvg';

export const TAB_BAR_DOCK_HEIGHT = Sizer.hSize(72);

const TAB_LABELS = {
  Home: 'Home',
  Booking: 'Book',
  Advisor: 'Advisor',
  Chat: 'Chat',
  Profile: 'Profile',
};

const TAB_ICONS = {
  Home: HomeSvg,
  Booking: BookingSvg,
  Chat: ChatSvg,
  Profile: ProfileSvg,
};

const ICON_W = Sizer.hSize(20);
const ICON_H = Sizer.hSize(22);

const CENTER_SIZE = Sizer.hSize(52);
const RING_SIZE = CENTER_SIZE + 6;
const RIPPLE_MAX_SCALE = 1.52;
const RIPPLE_LAYER_SIZE = RING_SIZE * RIPPLE_MAX_SCALE + 8;
const RIPPLE_INSET = (RING_SIZE - RIPPLE_LAYER_SIZE) / 2;
const RIPPLE_DELAYS = [0, 450, 900];

const DARK_SCREENS = ['Home', 'Advisor'];

const getChromeColor = routeName =>
  DARK_SCREENS.includes(routeName) ? COLORS.primary : COLORS.mainBg;

const TabIcon = ({ routeName, isFocused }) => {
  const IconComponent = TAB_ICONS[routeName];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent active={isFocused} width={ICON_W} height={ICON_H} />;
};

const RippleRing = ({ delay, ringSize, isFocused }) => {
  const phase = useSharedValue(0);
  const radius = ringSize / 2;

  useEffect(() => {
    if (isFocused) {
      phase.value = withRepeat(
        withSequence(
          withDelay(
            delay,
            withTiming(1, { duration: 1800, easing: Easing.out(Easing.cubic) }),
          ),
          withTiming(0, { duration: 0 }),
        ),
        -1,
      );
    } else {
      cancelAnimation(phase);
      phase.value = withTiming(0, { duration: 150 });
    }
  }, [isFocused, delay, phase]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: ringSize,
    height: ringSize,
    borderRadius: radius,
    opacity: interpolate(phase.value, [0, 0.15, 0.55, 1], [0, 0.55, 0.28, 0]),
    transform: [{ scale: interpolate(phase.value, [0, 1], [1, RIPPLE_MAX_SCALE]) }],
  }));

  return <Animated.View style={[styles.rippleRing, animatedStyle]} />;
};

const CircularWaves = ({ isFocused, ringSize }) => {
  if (!isFocused) {
    return null;
  }

  return (
    <View style={styles.rippleLayer} pointerEvents="none">
      {RIPPLE_DELAYS.map(delay => (
        <RippleRing key={delay} delay={delay} ringSize={ringSize} isFocused={isFocused} />
      ))}
    </View>
  );
};

const StandardTab = ({ route, isFocused, onPress, onLongPress }) => (
  <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.tabItem}
    accessibilityRole="button"
    accessibilityState={{ selected: isFocused }}
    accessibilityLabel={TAB_LABELS[route.name]}
  >
    <View style={styles.tabContent}>
      <TabIcon routeName={route.name} isFocused={isFocused} />
      <Typography
        fFamily={isFocused ? 'poppinsMedium500' : 'poppinsRegular400'}
        size={9}
        numberOfLines={1}
        color={COLORS.white100}
        style={{ opacity: isFocused ? 1 : 0.45 }}
        LineHeight={12}
      >
        {TAB_LABELS[route.name]}
      </Typography>
    </View>
  </Pressable>
);

const AdvisorCenterTab = ({ isFocused, onPress, onLongPress }) => (
  <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.tabItem}
    accessibilityRole="button"
    accessibilityState={{ selected: isFocused }}
    accessibilityLabel="Advisor"
  >
    <View style={styles.centerTabContent}>
      <View style={styles.centerElevated}>
        <View style={styles.avatarCluster}>
          <CircularWaves isFocused={isFocused} ringSize={RING_SIZE} />
          <View style={styles.centerRing}>
            <Image
              source={CLIENT_PROFILE.image}
              style={styles.centerAvatar}
              resizeMode="cover"
            />
            <View style={styles.centerBadge}>
              <Typography size={7} color={COLORS.secondary} fFamily="poppinsSemiBold600">
                ★
              </Typography>
            </View>
          </View>
        </View>
      </View>
      <Typography
        fFamily={isFocused ? 'poppinsMedium500' : 'poppinsRegular400'}
        size={9}
        numberOfLines={1}
        color={COLORS.white100}
        style={{ opacity: isFocused ? 1 : 0.45 }}
        LineHeight={12}
      >
        Advisor
      </Typography>
    </View>
  </Pressable>
);

const CustomTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name ?? 'Home';
  const chromeColor = getChromeColor(activeRoute);

  const navigateTo = route => {
    if (route.name === 'Chat') {
      navigation.navigate('AdminChatScreen');
    } else {
      navigation.navigate(route.name);
    }
  };

  return (
    <View
      style={[styles.chrome, { backgroundColor: chromeColor }]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.dock,
          {
            paddingBottom:
              insets.bottom > 0 ? insets.bottom - 6 : Sizer.vSize(4),
          },
        ]}
      >
        <View style={styles.tabsRow}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigateTo(route);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            if (route.name === 'Advisor') {
              return (
                <AdvisorCenterTab
                  key={route.key}
                  isFocused={isFocused}
                  onPress={onPress}
                  onLongPress={onLongPress}
                />
              );
            }

            return (
              <StandardTab
                key={route.key}
                route={route}
                isFocused={isFocused}
                onPress={onPress}
                onLongPress={onLongPress}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  chrome: {
    width: '100%',
    overflow: 'visible',
  },
  dock: {
    width: '100%',
    backgroundColor: COLORS.blue200,
    borderTopLeftRadius: Sizer.fS(24),
    borderTopRightRadius: Sizer.fS(24),
    paddingTop: Sizer.vSize(4),
    paddingHorizontal: Sizer.hSize(4),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'visible',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
      },
      android: { elevation: 12 },
    }),
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: Sizer.hSize(50),
    overflow: 'visible',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: Sizer.vSize(2),
    overflow: 'visible',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizer.vSize(2),
  },
  centerTabContent: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Sizer.vSize(2),
    width: '100%',
    height: Sizer.hSize(46),
    overflow: 'visible',
  },
  centerElevated: {
    position: 'absolute',
    top: -RING_SIZE * 0.6,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    overflow: 'visible',
  },
  avatarCluster: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  rippleLayer: {
    position: 'absolute',
    width: RIPPLE_LAYER_SIZE,
    height: RIPPLE_LAYER_SIZE,
    top: RIPPLE_INSET,
    left: RIPPLE_INSET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
  },
  centerRing: {
    zIndex: 2,
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    padding: 2,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.primary100,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary100,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: { elevation: 8 },
    }),
  },
  centerAvatar: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
  },
  centerBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: Sizer.hSize(16),
    height: Sizer.hSize(16),
    borderRadius: Sizer.hSize(8),
    backgroundColor: COLORS.primary100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.blue200,
  },
});
