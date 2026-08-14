import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
// ----
import { Container, Flex, Typography } from '../../atomComponents';
import {
  onboard01,
  onboard02,
  onboard03,
  onboardtextBg,
} from '../../assets/images';
import Sizer from '../../helpers/Sizer';
import { Button } from '../../components';
import { COLORS, GLOBALSTYLE, WINDOW } from '../../globalStyle/Theme';
import { KEYS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedTypography = Animated.createAnimatedComponent(Typography);

const OnBoardingScreen = ({ navigation }) => {
  const [currentIndex, setCurentIndex] = useState(0);

  // Animation values
  const bgOpacity = useSharedValue(1);
  const textContainerTranslateY = useSharedValue(0);
  const textOpacity = useSharedValue(1);
  const textScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);
  const buttonTranslateY = useSharedValue(0);

  const bgImage = {
    0: onboard01,
    1: onboard02,
    2: onboard03,
  };
  const text = {
    0: "Welcome to Lamb’s Business Solution",
    1: 'Built on Experience & Integrity',
    2: 'Services Designed for You',
  };
  const dots = [0, 1, 2];

  // Animation function for transitions
  const animateTransition = newIndex => {
    // Fade out current content
    textOpacity.value = withTiming(0, { duration: 200 });
    buttonOpacity.value = withTiming(0, { duration: 200 });
    textContainerTranslateY.value = withTiming(30, { duration: 200 });

    // Background fade effect
    bgOpacity.value = withTiming(0.7, { duration: 300 });

    // Update index after fade out
    setTimeout(() => {
      setCurentIndex(newIndex);
    }, 200);
  };

  // Reset animations when index changes
  useEffect(() => {
    // Animate content back in
    bgOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.quad),
    });

    textOpacity.value = withDelay(
      100,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.quad),
      }),
    );

    textScale.value = withDelay(
      100,
      withSpring(1, {
        damping: 15,
        stiffness: 100,
      }),
    );

    textContainerTranslateY.value = withDelay(
      100,
      withSpring(0, {
        damping: 15,
        stiffness: 100,
      }),
    );

    buttonOpacity.value = withDelay(
      200,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.quad),
      }),
    );

    buttonTranslateY.value = withDelay(
      200,
      withSpring(0, {
        damping: 12,
        stiffness: 80,
      }),
    );
  }, [currentIndex]);

  // Initial animation on mount
  useEffect(() => {
    textContainerTranslateY.value = 50;
    textOpacity.value = 0;
    textScale.value = 0.9;
    buttonTranslateY.value = 30;
    buttonOpacity.value = 0;

    // Animate in
    setTimeout(() => {
      textOpacity.value = withTiming(1, { duration: 600 });
      textScale.value = withSpring(1, { damping: 15, stiffness: 100 });
      textContainerTranslateY.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      });
      buttonOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
      buttonTranslateY.value = withDelay(
        300,
        withSpring(0, { damping: 12, stiffness: 80 }),
      );
    }, 100);
  }, []);

  const handleNext = () => {
    const newIndex = currentIndex < 2 ? currentIndex + 1 : 2;
    if (newIndex !== currentIndex) {
      animateTransition(newIndex);
      return;
    }
    AsyncStorage.setItem(KEYS.IS_ONBOARD, 'false');
    navigation.navigate('LoginScreen');
  };

  // Animated styles
  const backgroundStyle = useAnimatedStyle(() => ({
    // opacity: bgOpacity.value,
  }));

  const textContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: textContainerTranslateY.value },
      { scale: textScale.value },
    ],
    opacity: textOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <Container
      conStyle={styles.cont}
      isPadding={false}
      isPaddingVertical={false}
    >
      <AnimatedImageBackground
        source={bgImage[currentIndex]}
        resizeMode="cover"
        style={[styles.mainBg, backgroundStyle]}
      >
        <ImageBackground
          resizeMode="stretch"
          source={onboardtextBg}
          style={styles.textBgCont}
        >
          <Animated.View style={textContainerStyle}>
            <Typography
              fFamily="interTightSemiBold600"
              size={32}
              mT={21}
              textTransform={'capitalize'}
              style={{ maxWidth: 300 }}
              color="white"
              textAlign="center"
              LineHeight={40}
            >
              {text[currentIndex]}
            </Typography>
          </Animated.View>

          <Animated.View style={[textContainerStyle, { marginTop: 26 }]}>
            <Flex gap={6}>
              {dots.map(index => (
                <AnimatedDot
                  key={index}
                  isActive={index === currentIndex}
                  index={index}
                  currentIndex={currentIndex}
                />
              ))}
            </Flex>
          </Animated.View>

          <Animated.View
            style={[buttonStyle, { width: '100%', marginTop: 30 }]}
          >
            <Button
              label="Next"
              btnStyle={{ width: '100%' }}
              onPress={handleNext}
            />
          </Animated.View>
        </ImageBackground>
      </AnimatedImageBackground>
    </Container>
  );
};

// Animated Dot Component
const AnimatedDot = ({ isActive, index, currentIndex }) => {
  const dotWidth = useSharedValue(Sizer.vSize(8));
  const dotOpacity = useSharedValue(0.6);
  const dotScale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      dotWidth.value = withSpring(Sizer.hSize(32), {
        damping: 15,
        stiffness: 120,
      });
      dotOpacity.value = withTiming(1, { duration: 300 });
      dotScale.value = withSpring(1.1, { damping: 10, stiffness: 100 });
    } else {
      dotWidth.value = withSpring(Sizer.vSize(8), {
        damping: 15,
        stiffness: 120,
      });
      dotOpacity.value = withTiming(0.6, { duration: 300 });
      dotScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }
  }, [currentIndex]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    width: dotWidth.value,
    opacity: dotOpacity.value,
    transform: [{ scale: dotScale.value }],
  }));

  return (
    <Animated.View
      style={[styles.dot, isActive && styles.activDot, animatedDotStyle]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: COLORS.primary,
  },
  mainBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textBgCont: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: Sizer.vSize(24),
    borderTopLeftRadius: Sizer.vSize(20),
    alignItems: 'center',
    ...GLOBALSTYLE.paddingHor,
    overflow: 'hidden',

    paddingBottom: Sizer.vSize(100),
  },
  dot: {
    height: Sizer.vSize(8),
    borderRadius: Sizer.hSize(100),
    backgroundColor: COLORS.grey100,
  },
  activDot: {
    backgroundColor: COLORS.white100,
  },
});
