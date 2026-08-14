import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ActivityIndicator } from 'react-native-paper';

//-------
import { Container, Typography } from '../../../atomComponents';
import { Header } from '../../../components';
import BookingTypeSelector from '../../_partials/Booking/BookingTypeSelector';
import {
  BASEOPACITY,
  COLORS,
  GLOBALSTYLE,
  WINDOW,
} from '../../../globalStyle/Theme';
import { SubTitle } from '../../../components/Text/SubTitle';
import ImageGrid from '../../../components/imagePicker/ImageGrid';
import Sizer from '../../../helpers/Sizer';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { getGallery, getPhotosCategories } from '../../../api/generalService';
import { transformGalleryData } from '../../../utils';
import Icon from '../../../helpers/Icon';

const GalleryScreen = () => {
  const [videoIdd, setVideoId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Photos Categories Query Hook
  const { data: photosCategories } = useCustomQuery({
    queryKey: ['photosCatagories'],
    queryFn: getPhotosCategories,
  });

  const [photoCategryId, setphotoCategryId] = useState(
    photosCategories?.data?.[0]?.id,
  );

  //Galaery Query Hook:
  const { data: gallery, isLoading } = useCustomQuery({
    queryKey: ['gallery', photoCategryId],
    queryFn: ({ signal, queryKey }) => getGallery(signal, queryKey[1]),
  });

  const transformed = transformGalleryData(gallery);

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header type="app" title="Gallery" />
      <ScrollView
        style={GLOBALSTYLE.paddingHor}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}>
        <SubTitle mTitle="View:" />

        <BookingTypeSelector
          data={photosCategories?.data || []}
          onSetBookingType={setphotoCategryId}
          bookingTypeSelector={photoCategryId}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            padding: 10,
            alignItems: 'center',
            marginTop: Sizer.vSize(24),
          }}>
          <Typography
            fFamily={'poppinsSemiBold600'}
            color={COLORS.primary}
            size={16}
            mB={6}>
            Photos & Videos
          </Typography>
          <View
            style={{
              height: Sizer.vSize(3),
              backgroundColor: COLORS.primary,
              width: '100%',
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
        {isLoading ? <View style={{ height: WINDOW.height / 2, justifyContent: "center" }}>
          <ActivityIndicator size={20} />
        </View>
          : <ImageGrid
            images={transformed}
            onPressImage={videoId => {
              setVideoId(videoId);
              setIsModalVisible(true);
            }}
          />}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}>
            <Icon name="close" size={16} color="red" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <YoutubePlayer height={300} play={true} videoId={videoIdd} />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizer.vSize(20),
  },

  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: Sizer.vSize(10),
    overflow: 'hidden',
    width: '100%',
    maxWidth: 500,
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: WINDOW.height / 2 - 220,
    right: WINDOW.width / 2.1,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: Sizer.vSize(20),
    padding: Sizer.vSize(6),
  },
});
