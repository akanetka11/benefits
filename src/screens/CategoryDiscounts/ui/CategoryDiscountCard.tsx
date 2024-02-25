import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, screenWidth } from '@shared/styles';
import { Text, TextWeight } from '@components/ui';
import { CardHeartActiveIcon, CardHeartIcon } from '@assets/icons';
import { DiscountItemType } from '@shared/types';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { images } from '@config/images';
import { useFavoriteAnimation } from '@shared/hooks';
import { LastDeletedItemType } from '@screens/Favorites/ui/Favorites';

type CategoryDiscountCardProps = {
  item: DiscountItemType;
  index: number;
  addToFavorites?: () => void;
  removeFromFavorites?: () => void;
  onPress?: (T: number) => void;
  containerStyles?: StyleProp<ViewStyle>;
  isHeartAnimationEnabled?: boolean;
  lastDeletedItem?: LastDeletedItemType | null;
  setLastDeletedItem?: ({
    item,
    index,
  }: {
    item: DiscountItemType | null;
    index: number | null;
  }) => void;
  itemsCount?: number;
  setDeletedItemHeight?: (T: number) => void;
  deletedItemHeight?: number;
};

const CategoryDiscountCard: React.FC<CategoryDiscountCardProps> = ({
  item,
  index,
  addToFavorites = () => {},
  removeFromFavorites = () => {},
  onPress = () => {},
  containerStyles = {},
  isHeartAnimationEnabled = true,
  lastDeletedItem,
  setLastDeletedItem = () => {},
  itemsCount = 0,
  setDeletedItemHeight = () => {},
  deletedItemHeight = () => {},
}) => {
  const { description, discount, name, id, isSavedToFavorites, imgUrl } = item;

  const { activeHeartIconStyle, heartIconStyle, handlePressIcon } = useFavoriteAnimation(
    Boolean(isSavedToFavorites)
  );
  const translateY = useSharedValue(0);
  const opacityValue = useSharedValue(1);

  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);

  const onPressRemoveBtn = () => {
    if (isHeartAnimationEnabled) {
      handlePressIcon();
      addToFavorites();
    } else {
      setDeletedItemHeight(itemHeight);
      setLastDeletedItem({ item, index });
    }
  };

  const handleAnimation = useCallback(() => {
    if (lastDeletedItem === null || lastDeletedItem === undefined) {
      return;
    }
    if (item.id === lastDeletedItem?.item?.id) {
      opacityValue.value = withTiming(0, { duration: 200, easing: Easing.linear }, () => {
        index === itemsCount - 1 && runOnJS(setIsAnimationCompleted)(true);
      });
    } else if (index > Number(lastDeletedItem?.index)) {
      translateY.value = withTiming(
        -deletedItemHeight - 32,
        { duration: 450, easing: Easing.linear },
        () => {
          runOnJS(setIsAnimationCompleted)(true);
        }
      );
    }
  }, [
    itemsCount,
    index,
    item.id,
    opacityValue,
    translateY,
    deletedItemHeight,
    lastDeletedItem,
  ]);

  useEffect(() => {
    handleAnimation();
  }, [lastDeletedItem, handleAnimation]);

  useEffect(() => {
    if (isAnimationCompleted && itemsCount && itemsCount - 1 === index) {
      removeFromFavorites();
    }
    setIsAnimationCompleted(false);
  }, [index, isAnimationCompleted, itemsCount, removeFromFavorites]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: index > Number(lastDeletedItem?.index) ? translateY.value : 0,
      },
    ],
    opacity: item.id === lastDeletedItem?.item?.id ? opacityValue.value : 1,
  }));

  return (
    <Animated.View style={!isHeartAnimationEnabled && animatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, containerStyles]}
        onLayout={(event) => setItemHeight(event.nativeEvent.layout.height)}
        onPress={() => onPress(id)}
      >
        <View style={styles.imageContainer}>
          <View style={styles.discountView}>
            <Text color={colors.white} fontSize={12} weight={TextWeight.Bold}>
              {discount}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.heartView}
            onPress={onPressRemoveBtn}
          >
            {isSavedToFavorites ? (
              <Animated.Image
                source={CardHeartActiveIcon}
                style={[styles.icon, isHeartAnimationEnabled && activeHeartIconStyle]}
              />
            ) : (
              <Animated.Image
                source={CardHeartIcon}
                style={[styles.icon, isHeartAnimationEnabled && heartIconStyle]}
              />
            )}
          </TouchableOpacity>
          <Image resizeMode="stretch" source={images[imgUrl]} style={styles.image} />
        </View>
        <Text style={styles.name} weight={TextWeight.Bold}>
          {name}
        </Text>
        {description ? (
          <Text color={colors.gray} fontSize={14} weight={TextWeight.Normal}>
            {description}
          </Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: screenWidth - 32,
    height: 193,
    borderRadius: 12,
  },
  name: {
    marginTop: 16,
    marginBottom: 4,
  },
  discountView: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.secondary,
    borderRadius: 100,
    position: 'absolute',
    bottom: 12,
    left: 12,
    zIndex: 1,
  },
  heartView: {
    padding: 10,
    borderRadius: 100,
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: colors.white,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default CategoryDiscountCard;
