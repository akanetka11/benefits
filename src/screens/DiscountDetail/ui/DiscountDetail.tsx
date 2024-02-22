import Text, { TextWeight } from '@components/Text';
import { MainScreenProps, MainStackRoutes } from '@shared/const/routerMain';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowIcon } from 'src/assets';

type NavigationProps = MainScreenProps<MainStackRoutes.DiscountDetail>;

const DiscountDetail: React.FC<NavigationProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Image source={ArrowIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: insets.top ? insets.top + 16 : 16,
    },
    icon: {
      width: 20,
      height: 20,
    },
  });

export default DiscountDetail;
