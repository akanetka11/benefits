import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NoDataImage } from '@assets/images';
import { Text, TextAlign, TextWeight } from '@components/ui';
import { colors } from '@shared/styles';

const FavoritesEmptyView: React.FC = () => (
  <View style={styles.container}>
    <Image source={NoDataImage} style={styles.image} />
    <Text fontSize={20} lineHeight={24} style={styles.title} weight={TextWeight.Bold}>
      Нет избранного
    </Text>
    <Text
      color={colors.gray}
      fontSize={14}
      lineHeight={20}
      style={styles.text}
      textAlign={TextAlign.Center}
      weight={TextWeight.Normal}
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
