import { useCallback, useEffect } from 'react';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const useSplashIconAnimation = (
  index: number,
  translateX: number,
  translateY: number
) => {
  const isEven = index % 2 === 0;
  const offset = useSharedValue(0);
  const containerTranslate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const iconAnimationConfig = {
    duration: 300,
    easing: Easing.linear,
  };

  const handleAnimation = useCallback(() => {
    const handleRightAnimation = withTiming(4, iconAnimationConfig);

    const handleLeftAnimation = withTiming(-4, iconAnimationConfig);

    const handleBackAnimation = withTiming(0, iconAnimationConfig);

    const firstAnimation = isEven ? handleRightAnimation : handleLeftAnimation;
    const secondAnimation = isEven ? handleLeftAnimation : handleRightAnimation;

    containerTranslate.value = withTiming(
      1,
      {
        duration: 1000,
        easing: Easing.ease,
      },
      () => {
        offset.value = withRepeat(
          withSequence(
            firstAnimation,
            handleBackAnimation,
            secondAnimation,
            handleBackAnimation,
            firstAnimation,
            handleBackAnimation,
            secondAnimation,
            handleBackAnimation
          ),
          1,
          false,
          () => {
            opacity.value = withTiming(0, {
              duration: 300,
              easing: Easing.ease,
            });
          }
        );
      }
    );
  }, [offset, isEven, containerTranslate]);

  useEffect(() => {
    setTimeout(() => {
      handleAnimation();
    }, 1000);
  }, [handleAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { translateY: isEven ? offset.value : -offset.value },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(containerTranslate.value, [0, 1], [0, 1]);
    const translateXValue = interpolate(
      containerTranslate.value,
      [0, 1],
      [0, translateX]
    );
    const translateYValue = interpolate(
      containerTranslate.value,
      [0, 1],
      [0, translateY]
    );

    const rotate = interpolate(containerTranslate.value, [0, 1], [0, 360]);

    return {
      transform: [
        { translateX: translateXValue },
        { translateY: translateYValue },
        { rotate: `${rotate}deg` },
        { scale: scale },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => ({
    opacity: containerTranslate.value,
  }));

  return { animatedStyle, containerStyle, textStyle };
};
