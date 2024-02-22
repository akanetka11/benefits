import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NoDataImage } from '../../../assets';
import Text, { TextAlign, TextWeight } from '@components/Text';
import { colors } from '@styles/index';

const FavoritesEmptyView: React.FC = () => (
  <View style={styles.container}>
    <Image source={NoDataImage} style={styles.image} />
    <Text fontSize={20} style={styles.title} weight={TextWeight.Bold} lineHeight={24}>
      Нет избранного
    </Text>
    <Text
      color={colors.gray}
      fontSize={14}
      textAlign={TextAlign.Center}
      weight={TextWeight.Normal}
      style={styles.text}
      lineHeight={20}
    >
      Чтобы добавить любимые скидки, просто нажими на иконку 💙️ в карточке
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 212,
    height: 161,
  },
  title: {
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    width: 311,
  },
});

export default FavoritesEmptyView;
