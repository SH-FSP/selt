import React, { useState } from 'react';
import { View, Image, FlatList } from 'react-native';

//--------
import Sizer from '../../../helpers/Sizer';
import { COLORS } from '../../../globalStyle/Theme';
import { Flex, Typography } from '../../../atomComponents';
import Icon from '../../../helpers/Icon';

const ReviewItem = ({ review }) => {
  return (
    <View
      style={{
        paddingVertical: Sizer.hSize(16),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grey100,
      }}>
      <Flex jusContent="space-between" algItems="flex-start" mB={12}>
        <Flex algItems="center" gap={12}>
          <Image
            source={{ uri: review?.user.image }}
            style={{
              width: Sizer.vSize(48),
              height: Sizer.vSize(48),
              borderRadius: Sizer.vSize(100),
            }}
          />
          <Typography
            size={16}
            fFamily="interTightSemiBold600">
            {review?.user?.name}
          </Typography>
        </Flex>

        <View
          style={{
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderRadius: Sizer.hSize(200),
            paddingHorizontal: Sizer.vSize(12),
            paddingVertical: Sizer.hSize(3),
          }}>
          <Flex algItems="center" gap={4}>
            <Icon name="star" size={Sizer.fS(16)} color={COLORS.primary} />
            <Typography
              size={14}
              color={COLORS.primary}
              fFamily="poppinsSemiBold600">
              {review?.star}
            </Typography>
          </Flex>
        </View>
      </Flex>

      <Typography size={14} color={COLORS.black300} LineHeight={20}>
        {review?.description}
      </Typography>
    </View>
  );
};

export const ReviewsList = ({ selectedRating = 'all', reviewsData = [] }) => {
  const renderReviewItem = ({ item }) => {
    return <ReviewItem review={item} />;
  };

  const ListEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: Sizer.hSize(50),
        }}>
        <Typography
          size={16}
          color={COLORS.gray600}
          fFamily="poppinsRegular400"
          textAlign="center">
          No reviews found for{' '}
          {selectedRating === 'all'
            ? 'this filter'
            : `${selectedRating} star rating`}
        </Typography>
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: Sizer.vSize(16),
          paddingVertical: Sizer.hSize(16),
          // backgroundColor: COLORS.grey500,
        }}>
        <Typography
          size={14}
          color={COLORS.grey300}
          fFamily="poppinsRegular400">
          Showing {reviewsData?.length} review
          {reviewsData.length !== 1 ? 's' : ''}
          {selectedRating !== 'all' &&
            ` for ${selectedRating} star${selectedRating !== 1 ? 's' : ''}`}
        </Typography>
      </View>
    );
  };

  return (
    <FlatList
      data={reviewsData}
      renderItem={renderReviewItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      showsVerticalScrollIndicator={false}
    />
  );
};
