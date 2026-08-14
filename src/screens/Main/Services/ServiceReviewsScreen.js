import {Image, StyleSheet, View} from 'react-native';
import {useState} from 'react';
//---------
import {Container, Typography} from '../../../atomComponents';
import {Header} from '../../../components';
import Sizer from '../../../helpers/Sizer';
import StarFilter from '../../_partials/Service/StarFilter';
import {ReviewsList} from '../Review/ReviewsList';
import {useCustomQuery} from '../../../query/useCustomQuery';
import {getServiceDetails} from '../../../api/bookingService';
import {SubTitle} from '../../../components/Text/SubTitle';
import {star} from '../../../assets/images';

const ServiceReviewsScreen = ({navigation, route}) => {
  const serviceId = route.params?.serviceId;

  const [selectedRating, setSelectedRating] = useState('all');

  const {data: reviewsData, isLoading} = useCustomQuery({
    queryKey: ['serviceDetails', serviceId, selectedRating],
    queryFn: ({signal, queryKey}) =>
      getServiceDetails(signal, queryKey[1], queryKey[2]),
  });

  const noOfReviews =
    reviewsData?.reviewsCount > 999
      ? reviewsData?.reviewsCount / 1000 + 'k'
      : reviewsData?.reviewsCount;

  return (
    <Container isPaddingVertical={false} isTextureVisible>
      <Header title="Reviews" />
      <SubTitle
        mTitle={
          <>
            <Image
              source={star}
              style={{...styles.time, marginRight: Sizer.vSize(60)}}
              resizeMode="contain"
            />
            {parseFloat(reviewsData?.reviewsAverage || 0).toFixed(1)} (
            {noOfReviews} reviews)
          </>
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
    </Container>
  );
};

export default ServiceReviewsScreen;

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
