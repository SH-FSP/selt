import { Platform } from 'react-native';
import { openSettings, requestNotifications } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
//-----------
import { KEYS } from '../constants';
import notifee, { AndroidStyle } from '@notifee/react-native';
import { queryClient } from '../api/api';

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true; // Avoid firebase deprecation warning

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    const { status } = await requestNotifications([
      'alert',
      'sound',
      'badge',
      'carPlay',
    ]);
    if (status === 'granted') {
      await registerForNotifications();
    } else if (status === 'denied' || status === 'blocked') {
      openSettings();
    }
  }

  const authStatus = await messaging().requestPermission();
  if (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    await registerForNotifications();
  }
};

export const notificationListener = dispatch => {
  receiveBackgroundMessages();
  receiveInitialNotificationMessages();
  receiveForegroundMessages(dispatch);
};

const registerForNotifications = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(
      ' notificationHelper.js:44 ~ registerForNotifications ~ token:',
      token,
    );

    if (token) {
      AsyncStorage.setItem(KEYS.FCM_TOKEN, token);
    }
  } catch (err) {
    console.log(
      ' notificationHelper.js:49 ~ registerForNotifications ~ err:',
      err,
    );
  }
};

const receiveForegroundMessages = () => {
  messaging().onMessage(async remoteMessage => {
    console.log(
      ' notificationHelper.js:48 ~ messaging ~ remoteMessage:',
      remoteMessage,
    );

    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    queryClient.invalidateQueries({ queryKey: ['notifications'] });

    handleForegroundNotification(remoteMessage);
  });
};

const receiveInitialNotificationMessages = () => {
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      console.log(
        '🚀 ~ receiveInitialNotificationMessages ~ notification state quit:',
        remoteMessage,
      );
    });
};

const receiveBackgroundMessages = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('notification state background: ', remoteMessage); // background click
  });
};

const handleForegroundNotification = async remoteMsg => {
  // console.log('🚀 ~ handleForegroundNotification ~ remoteMsg:', remoteMsg);
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.requestPermission();

    const title = remoteMsg?.notification?.title;
    const body = remoteMsg?.notification?.body;
    const imageUrl =
      remoteMsg?.notification?.android?.imageUrl || remoteMsg?.data?.imageUrl;
    console.log('🚀 ~ handleForegroundNotification ~ imageUrl:', imageUrl);

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        pressAction: { id: 'default' },
        style: imageUrl
          ? {
              type: AndroidStyle.BIGPICTURE,
              picture: imageUrl,
            }
          : undefined,
      },
    });

    console.log('NOTI DONE');
  } catch (err) {
    console.log(
      ' notificationHelper.js:66 ~ handleForegroundNotification ~ err:',
      err,
    );
  }
};
