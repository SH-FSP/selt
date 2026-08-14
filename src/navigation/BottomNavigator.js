import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useKeyboard } from '../hooks/useKeyboard';
import { COLORS } from '../globalStyle/Theme';
import {
  AdvisorScreen,
  BookingScreen,
  AdminChatScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { keyboardOpen } = useKeyboard();

  return (
    <Tab.Navigator
      style={styles.navigator}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => (!keyboardOpen ? <CustomTabBar {...props} /> : null)}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ sceneStyle: styles.darkScene }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{ sceneStyle: styles.lightScene }}
      />
      <Tab.Screen
        name="Advisor"
        component={AdvisorScreen}
        options={{ sceneStyle: styles.darkScene, tabBarLabel: 'Advisor' }}
      />
      <Tab.Screen
        name="Chat"
        component={AdminChatScreen}
        options={{ sceneStyle: styles.lightScene }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ sceneStyle: styles.lightScene }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  darkScene: {
    backgroundColor: COLORS.primary,
  },
  lightScene: {
    backgroundColor: COLORS.mainBg,
  },
});

export default BottomNavigator;
