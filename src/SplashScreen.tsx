import React from 'react';
import { AnimatedIcon, Text } from './components';
import { StyleSheet, View } from 'react-native';
import {
  SplashIcon1,
  SplashIcon2,
  SplashIcon3,
  SplashIcon4,
  SplashIcon5,
  SplashIcon6,
  SplashIcon7,
  SplashIcon8,
} from './assets';
import { TextWeight } from '@components/Text';
import Animated, { FadeInDown } from 'react-native-reanimated';

const SplashScreen: React.FC = () => {
  const icons = [
    SplashIcon1,
    SplashIcon2,
    SplashIcon3,
    SplashIcon4,
    SplashIcon5,
    SplashIcon6,
    SplashIcon7,
    SplashIcon8,
  ];

  return (
    <View style={styles.container}>
      {icons.map((image, index) => {
        const angle = (index * 2 * Math.PI) / icons.length;
        const x = Math.cos(angle);
        const y = Math.sin(angle);

        return (
          <AnimatedIcon
            key={index}
            image={image}
            index={index}
            translateX={x * 120}
            translateY={y * 100}
          />
        );
      })}
      <Animated.View entering={FadeInDown.duration(600).delay(1500)}>
        <Text fontSize={28} weight={TextWeight.Bold}>
          benefits
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
