import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '../atomComponents';
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

const DARK_SCREENS = ['Home'];

const getChromeColor = routeName =>
  DARK_SCREENS.includes(routeName) ? COLORS.primary : COLORS.mainBg;

const TabIcon = ({ routeName, isFocused }) => {
  const IconComponent = TAB_ICONS[routeName];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent active={isFocused} width={ICON_W} height={ICON_H} />;
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
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: Sizer.hSize(50),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizer.vSize(2),
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizer.vSize(2),
  },
});
