import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Typography, Flex, Container } from '../../../atomComponents';
//----
import Sizer from '../../../helpers/Sizer';
import { COLORS, FONTS, GLOBALSTYLE, WINDOW } from '../../../globalStyle/Theme';
import { nonotif, notif } from '../../../assets/images';
import { Header } from '../../../components';
import SlideInView from '../../../animations/SlideView';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { getNotification } from '../../../api/generalService';
import ListEmpty from '../../../atomComponents/ListEmpty';

const NotificationScreen = () => {
  const { data: notifications, isLoading } = useCustomQuery({
    queryKey: ['notifications'],
    queryFn: getNotification,
  });

  const renderItem = ({ item, index }) => {
    const notiImage =
      item?.image?.indexOf('no-image') === -1 ? { uri: item?.image } : notif;
    return (
      <SlideInView slide="right">
        <View style={[styles.cardContainer, styles.cardWithBg]}>
          <Flex gap={10}>
            <View style={styles.iconCircle}>
              <Image
                source={notiImage}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Flex direction="column" flex={1}>
              <Typography
                size={15}
                color={COLORS.black100}
                fFamily="poppinsMedium500"
                LineHeight={18}
              >
                {item?.title}
              </Typography>
              <Typography
                size={14}
                mT={2}
                color={COLORS.black100}
                numberOfLines={3}
                LineHeight={18}
              >
                {item?.description}
              </Typography>
              <Typography size={12} mT={3}>
                {new Date(item?.created_at).toISOString().split('T')[0]}
              </Typography>
            </Flex>
          </Flex>
        </View>
      </SlideInView>
    );
  };

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header type="app" title="Notifications" />

      <FlatList
        data={notifications?.data || []}
        style={{ marginTop: Sizer.vSize(18), ...GLOBALSTYLE.paddingHor }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmpty
            isLoading={isLoading}
            height={WINDOW.height / 1.5}
            vector={nonotif}
          />
        }
      />
    </Container>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  cardContainer: {
    padding: Sizer.hSize(12),
    borderRadius: Sizer.hSize(16),
    marginBottom: Sizer.hSize(12),
  },
  cardWithBg: {
    backgroundColor: '#FEF1DD',
  },
  iconCircle: {
    width: Sizer.hSize(60),
    height: Sizer.hSize(60),
    borderRadius: Sizer.hSize(200),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
    overflow: 'hidden',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  emptyMsgView: {
    alignItems: 'center',
    flex: 1,
    marginTop: WINDOW.height / 3,
  },
  emptyMsgText: {
    fontSize: Sizer.hSize(16),
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    marginTop: 12,
  },
  container: {
    paddingBottom: Sizer.hSize(150),
  },
});
