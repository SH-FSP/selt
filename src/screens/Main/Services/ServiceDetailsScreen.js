import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//---------
import { Container, Flex, Typography } from '../../../atomComponents';
import { star } from '../../../assets/images';
import { Button, Header } from '../../../components';
import { COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Divider } from 'react-native-paper';
import { SubTitle } from '../../../components/Text/SubTitle';
import { discountedPrice } from '../../../utils/index';
import ImageGrid from '../../../components/imagePicker/ImageGrid';
import StarFilter from '../../_partials/Service/StarFilter';
import { ReviewsList } from '../Review/ReviewsList';
import { useCustomQuery } from '../../../query/useCustomQuery';
import {
  getServiceCategories,
  getServiceDetails,
} from '../../../api/bookingService';
import Icon from '../../../helpers/Icon';

const ServiceDetailsScreen = ({ navigation, route }) => {
  const serviceDetail = route.params?.serviceDetail;

  const { user } = useSelector(state => state.app);
  const phonenAddressFlag = !!(user?.address && user?.phone);

  const [selectedRating, setSelectedRating] = useState('all');

  //reviews Query Hook:
  const { data: reviewsData, isLoading } = useCustomQuery({
    queryKey: ['serviceDetails', serviceDetail?.id, selectedRating],
    queryFn: ({ signal, queryKey }) =>
      getServiceDetails(signal, queryKey[1], queryKey[2]),
  });

  const { salePrice, actualPrice } = discountedPrice(
    serviceDetail?.price,
    serviceDetail?.discount,
  );

  const noOfReviews =
    reviewsData?.reviewsCount > 999
      ? reviewsData?.reviewsCount / 1000 + 'k'
      : reviewsData?.reviewsCount;

  return (
    <Container isPaddingVertical={false} isPadding={false} isTextureVisible>
      <ScrollView>
        <ImageBackground
          source={{ uri: serviceDetail?.image }}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <Header isBackGreen />
        </ImageBackground>
        <View style={GLOBALSTYLE.paddingHor}>
          <Flex mT={28} jusContent={'space-between'} gap={12}>
            <Flex direction={'column'} flex={1}>
              <Typography
                size={22}
                numberOfLines={2}
                fFamily="interTightBold700"
                style={{ maxWidth: '80%' }}
                LineHeight={24}
              >
                {serviceDetail?.name}
              </Typography>
              <Flex algItems={'center'} mT={9} jusContent={'space-between'}>
                <Flex gap={6}>
                  <Image
                    source={star}
                    style={styles.time}
                    resizeMode="contain"
                  />
                  <Typography size={14} fFamily="poppinsMedium500">
                    {serviceDetail?.slot || 20} mins service
                    {/* <Typography size={14} fFamily="poppinsMedium500">
                      (2.5k reviews)
                    </Typography> */}
                  </Typography>
                </Flex>
              </Flex>
            </Flex>

            <Flex algItems={'center'}>
              <Typography
                size={24}
                numberOfLines={1}
                fFamily="poppinsBold700"
                adjustsFontSizeToFit
                color={COLORS.primary}
              >
                ${salePrice + ' '}
                {salePrice < actualPrice && (
                  <Typography
                    size={16}
                    style={{ textDecorationLine: 'line-through' }}
                  >
                    ${actualPrice}
                  </Typography>
                )}
              </Typography>
            </Flex>
          </Flex>
          <Divider style={styles.separator} />

          <SubTitle mTitle="About Service" />

          <Typography size={14} mT={5} >
            {serviceDetail?.description}
          </Typography>

          {serviceDetail?.multiple_images && (
            <>
              <SubTitle
                mTitle="Photos"
                onSeeAllPress={() =>
                  navigation.navigate('ServicePhotosScreen', {
                    serviceImages: serviceDetail?.multiple_images,
                  })
                }
                isSeeAllTextVisible
              // isSeeAllTextVisible={serviceDetail?.multiple_images?.length > 6}
              />
              <ImageGrid
                images={serviceDetail?.multiple_images?.slice(0, 6) || []}
              />
            </>
          )}
          <SubTitle
            mTitle={
              <>
                <Image
                  source={star}
                  style={{ ...styles.time, marginRight: Sizer.vSize(60) }}
                  resizeMode="contain"
                />{' '}
                {parseFloat(reviewsData?.reviewsAverage || 0).toFixed(1)} (
                {noOfReviews || 0} reviews)
              </>
            }
            isSeeAllTextVisible
            onSeeAllPress={() =>
              navigation.navigate('ServiceReviewsScreen', {
                serviceId: serviceDetail?.id,
              })
            }
          />

          <StarFilter
            onFilterChange={rating => {
              setSelectedRating(rating);
            }}
          />
          <ReviewsList
            selectedRating={selectedRating}
            reviewsData={reviewsData?.reviews || []}
          />
          {!phonenAddressFlag && (
            <Flex mT={40} algItems={'center'} gap={6}>
              <Icon name={'info'} iconFamily={'Feather'} color={COLORS.red} />
              <Typography color={COLORS.red}>
                Compete your Profile to initiate your Booking!
              </Typography>
            </Flex>
          )}
          <Button
            label="Book Now"
            mb={60}
            mt={phonenAddressFlag ? 40 : 8}
            disabled={!phonenAddressFlag}
            // type={!phonenAddressFlag ? '' : 'secondary'}
            type={null}
            onPress={() =>
              navigation.navigate('AppointmentBookingScreen', {
                serviceDetail: serviceDetail,
              })
            }
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ServiceDetailsScreen;

const styles = StyleSheet.create({
  headerBackground: {
    height: Sizer.vSize(377),
    borderBottomLeftRadius: Sizer.hSize(24),
    borderBottomRightRadius: Sizer.hSize(24),
    overflow: 'hidden',
    paddingHorizontal: Sizer.hSize(24),
    paddingTop: Sizer.vSize(24),
    alignItems: 'center',
  },
  time: {
    width: Sizer.vSize(15),
    height: Sizer.vSize(15),
  },
  separator: {
    marginTop: Sizer.vSize(27),
  },
});
