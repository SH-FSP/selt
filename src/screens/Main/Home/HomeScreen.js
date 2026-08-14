import React, { useCallback, useMemo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

// Imports
import {
  BASEOPACITY,
  COLORS,
  GLOBALSTYLE,
  WINDOW,
} from '../../../globalStyle/Theme';
import { homeBgTexture } from '../../../assets/images';
import { Container, Flex, Typography } from '../../../atomComponents';
import { Header } from '../../../components';
import Sizer from '../../../helpers/Sizer';
import RightIconSvg from '../../../assets/svgs/RightIconSvg';
import { useCustomQuery } from '../../../query/useCustomQuery';
import { getServices } from '../../../api/bookingService';
import NoServicesSvg from '../../../assets/svgs/NoServicesSvg';
import { services } from '../../../constants/AppData';

// Constants
const HEADER_HEIGHT = Sizer.hSize(240);
const SCALE = 0.9;
const RIGHT_OFFSET = WINDOW.width * (1 - SCALE);
const ITEM_WIDTH = WINDOW.width * SCALE;
const ITEM_HEIGHT = 230;
const PAGE_HEIGHT = WINDOW.height - HEADER_HEIGHT;
const PAGE_WIDTH = WINDOW.width;

const HomeScreen = ({ navigation }) => {
  const { data } = useCustomQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  // Memoized carousel dimensions
  const carouselDimensions = useMemo(
    () => ({
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      itemWidth: ITEM_WIDTH,
      itemHeight: ITEM_HEIGHT,
    }),
    [PAGE_WIDTH, PAGE_HEIGHT, ITEM_WIDTH, ITEM_HEIGHT],
  );

  // Optimized animation style with useCallback
  const animationStyle = useCallback(
    value => {
      'worklet';
      const translateY = interpolate(
        value,
        [1, 0, -1],
        [ITEM_HEIGHT, 0, -ITEM_HEIGHT],
      );

      const opacity = interpolate(value, [-1, 0, 1], [0.4, 1, 0.4]);

      const scale = interpolate(value, [-1, 0, 1], [0.6, 1, 0.6]);

      const right = interpolate(value, [-1, 0, 1], [110, RIGHT_OFFSET, 110]);

      return {
        transform: [{ translateY }, { scale }],
        right,
        opacity,
      };
    },
    [RIGHT_OFFSET, ITEM_HEIGHT],
  );

  // Memoized render item function
  const renderCarouselItem = useCallback(
    ({ item, index }) => (
      <SlideItem item={item} index={index} navigation={navigation} />
    ),
    [navigation],
  );

  return (
    <Container
      conStyle={styles.container}
      isPadding={false}
      isPaddingVertical={false}
    >
      <Header type="home" />

      <View
        style={[
          styles.backgroundImage,
          !data?.length && {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {!data?.length ? (
          <NoServicesSvg />
        ) : (
          <Carousel
            vertical
            scrollAnimationDuration={800}
            style={[styles.carousel, carouselDimensions]}
            width={carouselDimensions.itemWidth}
            height={carouselDimensions.itemHeight}
            // data={services}
            data={data || []}
            snapEnabled
            renderItem={renderCarouselItem}
            customAnimation={animationStyle}
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          // panGestureHandlerProps={{
          //   activeOffsetY: [-10, 10],
          // }}
          />
        )}
      </View>

    </Container>
  );
};

// Optimized SlideItem component
const SlideItem = React.memo(
  ({ item, index, navigation, ...animatedViewProps }) => {
    const handlePress = useCallback(() => {
      navigation.navigate('ServiceDetailsScreen', { serviceDetail: item });
    }, [navigation, item.id, index]);

    return (
      <Animated.View style={styles.slideContainer} {...animatedViewProps}>
        <TouchableOpacity
          style={styles.serviceCard}
          activeOpacity={BASEOPACITY}
          onPress={handlePress}
        >
          {/* Service Information Section */}
          <ServiceInfo item={item} index={index} />

          {/* Service Image Section */}
          <ServiceImageCard item={item} />
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

// Extracted service info component
const ServiceInfo = React.memo(({ item, index }) => (
  <Flex direction="column" flex={1} gap={8}>
    <Typography color={COLORS.white100} size={16}>
      {`${index + 1}. Service`}
    </Typography>

    <Typography
      color={COLORS.white100}
      fFamily="interTightSemiBold600"
      size={24}
      numberOfLines={2}
    >
      {item?.name}
    </Typography>

    <Typography color={COLORS.white100} size={12} numberOfLines={5}>
      {item?.description}
    </Typography>
  </Flex>
));

// Extracted service image card component
const ServiceImageCard = React.memo(({ item }) => (
  <Flex direction="column" flex={1} gap={4} flexStyle={styles.imageCard}>
    <Animated.Image
      style={styles.serviceImage}
      source={{ uri: item?.image }}
      resizeMode="cover"
    />

    <View style={styles.imageCardFooter}>
      <Typography
        color={COLORS.black100}
        size={16}
        fFamily="poppinsSemiBold600"
        LineHeight={20}
      >
        {item?.price}
      </Typography>

      <RightIconSvg height={25} width={25} />
    </View>
  </Flex>
));

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },

  backgroundImage: {
    ...GLOBALSTYLE.paddingHor,
    paddingTop: Sizer.vSize(20),
    paddingBottom: Sizer.vSize(8),
    flex: 1,
  },

  carousel: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  serviceCard: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },

  imageCard: {
    backgroundColor: COLORS.white100,
    padding: Sizer.vSize(6),
    borderRadius: Sizer.fS(10),
    height: '100%',
  },

  serviceImage: {
    width: '100%',
    height: Sizer.hSize(140),
    borderRadius: Sizer.fS(10),
    overflow: 'hidden',
  },

  imageCardFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeScreen;
