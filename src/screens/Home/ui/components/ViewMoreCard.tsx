import Text, { TextWeight } from '@components/Text';
import { colors, screenWidth } from '@styles/index';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type ViewMoreCardProps = {
  numberOfDiscounts: number;
  onPress: () => void;
};

const ViewMoreCard: React.FC<ViewMoreCardProps> = ({ numberOfDiscounts, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={1}>
    <Text color={colors.gray} fontSize={14} weight={TextWeight.Bold}>
      Смотреть ещё {numberOfDiscounts}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: (screenWidth / 100) * 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.natural,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1.7,
    height: 'auto',
  },
});

export default ViewMoreCard;
