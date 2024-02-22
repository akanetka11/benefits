import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text, { TextWeight } from '../../../../components/Text';
import { colors, screenWidth } from '../../../../styles';
import { CardHeartActiveIcon, CardHeartIcon } from '../../../../assets';
import { DiscountItemType } from '@shared/types';
import { images } from '@config/images';

type DiscountCardProps = {
  item: DiscountItemType;
  isNew?: boolean;
  onPress: () => void;
};

const DiscountCard: React.FC<DiscountCardProps> = ({
  item,
  isNew = false,
  onPress = () => {},
}) => {
  const { name, discount, isSavedToFavorites } = item;
  const styles = getStyles(isNew);
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.discountView}>
          <Text
            color={colors.white}
            fontSize={12}
            lineHeight={16}
            weight={TextWeight.Bold}
          >
            {discount}
          </Text>
        </View>
        {!isNew ? (
          <View style={styles.heartView}>
            <Image
              source={isSavedToFavorites ? CardHeartActiveIcon : CardHeartIcon}
              style={styles.heartIcon}
            />
          </View>
        ) : null}
        <Image source={images[item.imgUrl]} style={styles.image} />
      </View>
      {!isNew ? (
        <Text fontSize={14} lineHeight={20} weight={TextWeight.Bold}>
          {name}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const getStyles = (isNew: boolean) =>
  StyleSheet.create({
    container: {
      width: isNew ? (screenWidth / 100) * 81 : (screenWidth / 100) * 60,
    },
    cardContainer: {
      width: '100%',
      position: 'relative',
      marginBottom: 12,
    },
    image: {
      width: '100%',
      aspectRatio: 1.7,
      height: 'auto',
      borderRadius: 12,
    },
    discountView: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: colors.secondary,
      borderRadius: 100,
      position: 'absolute',
      bottom: 8,
      left: 8,
      zIndex: 1,
    },
    heartView: {
      padding: 6,
      borderRadius: 100,
      position: 'absolute',
      top: 4,
      right: 4,
      zIndex: 1,
      backgroundColor: colors.white,
    },
    heartIcon: {
      width: 20,
      height: 20,
    },
  });

export default DiscountCard;
