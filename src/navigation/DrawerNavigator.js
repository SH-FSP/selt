import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
} from '@react-navigation/drawer';

import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import { useState } from 'react';
import BottomNavigator from './BottomNavigator';
import { COLORS, FONTS, GLOBALSTYLE } from '../globalStyle/Theme';
import { drawerListData } from './DrawerListData';
import { homeBgTexture } from '../assets/images';
import { Flex, Typography } from '../atomComponents';
import LogoutModal from '../components/modals/LogoutModal';
import { useCustomQuery } from '../query/useCustomQuery';
import { deleteAcount, logout } from '../api/userService';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { handleLogout } from '../redux/slices/appSlice';
import { queryClient } from '../api/api';
import { Button } from '../components';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.blue200,
          width: '75%',
        },
        overlayColor: `rgba(0,8,85, .3)`,
        swipeEnabled: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="BottomTabs" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent({ navigation, ...props }) {
  const dispatch = useDispatch();
  const drawerStatus = useDrawerStatus();

  const { user } = useSelector(state => state.app);

  const [modalVisibility, setVisibility] = useState(false);

  function clearApp() {
    queryClient.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      }),
    );
  }
  //Custom Logout Query Hook
  const { refetch: triggerLogout } = useCustomQuery({
    queryKey: ['logout'],
    queryFn: logout,
    enabled: false,
  });

  //Custom Delate Query Hook
  const { refetch: triggerDeleteAccount, isLoading } = useCustomQuery({
    queryKey: ['delete'],
    queryFn: deleteAcount,
    enabled: false,
  });

  // Request Logout:
  const logoutHandler = () => {
    clearApp();
    triggerLogout().then(() => {
      dispatch(handleLogout());
    });
  };

  //Request Delete
  const handleDeleteAcount = () => {
    triggerDeleteAccount().then(() => {
      clearApp();
      dispatch(handleLogout());
    });
  };

  const renderDrawerItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.drawerItem}
        onPress={() => {
          if (item?.label == 'Log out') {
            logoutHandler();
          } else if (item?.link) {
            item?.tabType
              ? navigation.navigate(item?.tabType, { screen: item?.link })
              : navigation.navigate(item?.link);
          } else if (item?.label == 'Delete Account') {
            setVisibility(true);
          }
        }}
      >
        <View style={styles.drawerItemContent}>
          {item.svg}
          <Typography
            fFamily="poppinsMedium500"
            size={16}
            color={item?.label.indexOf('Delete') !== -1 ? COLORS.red : 'white'}
            style={styles.drawerItemText}
          >
            {item.label}
          </Typography>
        </View>

        <Modal
          visible={modalVisibility}
          statusBarTranslucent
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white100,
                marginHorizontal: 20,
                paddingVertical: 30,
                paddingHorizontal: 20,
                borderRadius: 12,
                width: '90%',
              }}
            >
              <Typography
                textAlign="center"
                fFamily="interTightSemiBold600"
                size={20}
              >
                Are you sure you want to delete your account?
              </Typography>

              <Typography
                size={14}
                textAlign="center"
                color={COLORS.grey}
                mT={10}
              >
                This action is permanent and cannot be undone.
              </Typography>

              <Flex gap={12} mT={30}>
                <Button
                  btnStyle={{ flex: 1 }}
                  label="Delete"
                  type="primary"
                  textColor={COLORS.red}
                  onPress={handleDeleteAcount}
                  loadColor={COLORS.red}
                  loader={isLoading}
                />
                <Button
                  btnStyle={{ flex: 1 }}
                  label="Cancel"
                  type="secondary"
                  onPress={() => setVisibility(false)}
                  disabled={isLoading}
                />
              </Flex>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ImageBackground
        source={homeBgTexture}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <DrawerContentScrollView style={GLOBALSTYLE.paddingHor} {...props}>
          {drawerStatus === 'open' && (
            <StatusBar
              backgroundColor={COLORS.primary}
              barStyle="light-content"
              animated
            />
          )}
          <View style={styles.headerView}>
            <Image source={{ uri: user?.image }} style={styles.headerImg} />
            <Typography
              fFamily="poppinsMedium500"
              size={18}
              color="white"
              textTransform={'capitalize'}
            >
              {user?.name}
            </Typography>
          </View>

          {/* Render custom drawer items */}
          <View style={styles.drawerItemsContainer}>
            {drawerListData.map((item, index) => renderDrawerItem(item, index))}
          </View>
        </DrawerContentScrollView>
      </ImageBackground>

      {/* <LogoutModal
        visible={modalVisibility}
        onClose={() => setVisibility(false)}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  headerImg: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.white100,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 30,
    marginBottom: 50,
  },
  drawerItemsContainer: {
    paddingTop: 10,
  },
  drawerItem: {
    marginBottom: 25,
    paddingVertical: 5,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 23,
  },
  drawerItemText: {
    flex: 1,
  },
});
