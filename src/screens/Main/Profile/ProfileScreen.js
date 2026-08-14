import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { Container, Flex, Typography } from '../../../atomComponents';
import { BASEOPACITY, COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Header } from '../../../components';
import Icon from '../../../helpers/Icon';
import { handleLogout } from '../../../redux/slices/appSlice';
import { logout } from '../../../api/userService';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { queryClient } from '../../../api/api';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.app);

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

  // Request Logout:
  const logoutHandler = () => {
    clearApp();
    triggerLogout().then(() => {
      dispatch(handleLogout());
    });
  };

  const ProfileMenuItem = ({ label, icon, iconFamily, onPress, color }) => (
    <TouchableOpacity
      activeOpacity={BASEOPACITY}
      onPress={onPress}
      style={styles.menuItem}
    >
      <Flex algItems="center" gap={12}>
        <View style={styles.iconCircle}>
          <Icon
            name={icon}
            iconFamily={iconFamily}
            size={Sizer.fS(20)}
            color={COLORS.primary}
          />
        </View>
        <Typography
          fFamily="poppinsMedium500"
          size={16}
          color={color || COLORS.black100}
        >
          {label}
        </Typography>
      </Flex>
      <Icon
        name="chevron-right"
        iconFamily="Feather"
        size={Sizer.fS(20)}
        color={COLORS.grey400}
      />
    </TouchableOpacity>
  );

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header type="app" title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GLOBALSTYLE.paddingHor}
        contentContainerStyle={{ paddingBottom: Sizer.hSize(88) }}
      >
        <Flex algItems={'center'} direction={'column'} mT={40} mb={30}>
          <Avatar.Image
            source={{ uri: user?.image }}
            size={Sizer.hSize(100)}
            style={{ backgroundColor: 'grey' }}
          />
          <Typography
            size={22}
            mT={15}
            fFamily="interTightSemiBold600"
            color={COLORS.black100}
            textTransform="capitalize"
          >
            {user?.name || 'User Name'}
          </Typography>
          <Typography
            size={14}
            mT={4}
            fFamily="poppinsRegular400"
            color={COLORS.grey300}
          >
            {user?.email || 'user@example.com'}
          </Typography>
        </Flex>

        <View style={styles.menuContainer}>
          <ProfileMenuItem
            label="Profile Details"
            icon="user"
            iconFamily="Feather"
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
          <ProfileMenuItem
            label="Log out"
            icon="logout"
            iconFamily="MaterialIcons"
            onPress={logoutHandler}
            color={COLORS.red}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: Sizer.vSize(20),
    gap: Sizer.vSize(15),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white200,
    padding: Sizer.fS(12),
    borderRadius: Sizer.fS(12),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  iconCircle: {
    width: Sizer.fS(40),
    height: Sizer.fS(40),
    borderRadius: Sizer.fS(20),
    backgroundColor: `${COLORS.grey400}30`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
