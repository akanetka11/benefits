import { useSplashIconAnimation } from '@hooks/useSplashIconAnimation';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

type AnimatedIconProps = {
  image: ImageSourcePropType;
  index: number;
  translateX: number;
  translateY: number;
};

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  image,
  index,
  translateX,
  translateY,
}) => {
  const { animatedStyle, containerStyle } = useSplashIconAnimation(
    index,
    translateX,
    translateY
  );
  return (
    <Animated.View key={index} style={[styles.iconContainer, containerStyle]}>
      <Animated.View style={animatedStyle}>
        <Image source={image} style={styles.icon} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedIcon;
