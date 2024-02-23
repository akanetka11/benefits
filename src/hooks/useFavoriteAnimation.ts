import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useFavoriteAnimation = (isSavedToFavorites: boolean) => {
  const iconValue = isSavedToFavorites ? 0 : 1;
  const activeIconValue = isSavedToFavorites ? 1 : 0;

  const activeIconScale = useSharedValue(activeIconValue);
  const iconScale = useSharedValue(iconValue);

  const animationConfig = {
    duration: 300,
    easing: Easing.linear,
  };

  const handlePressIcon = () => {
    activeIconScale.value = withTiming(iconValue, animationConfig);
    iconScale.value = withTiming(activeIconValue, animationConfig);
  };

  const activeHeartIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: activeIconScale.value }],
    opacity: activeIconScale.value,
  }));

  const heartIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    opacity: iconScale.value,
  }));

  return { activeHeartIconStyle, heartIconStyle, handlePressIcon };
};
