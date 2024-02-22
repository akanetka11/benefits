import Text, { TextWeight } from '@components/Text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);
  return (
    <View style={styles.container}>
      <Text fontSize={28} weight={TextWeight.Bold}>
        Профиль
      </Text>
    </View>
  );
};

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top ? insets.top + 16 : 16,
      paddingHorizontal: 16,
    },
  });

export default Profile;
