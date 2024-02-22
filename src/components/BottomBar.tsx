import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text, { TextWeight } from './Text';
import { colors } from '../styles';
import bottomBarConfig from '@config/bottom-bar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomBarStackRoutes } from '@shared/const/routerBottomBar';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomTabProps = {
  inFocusImagePath: ImageSourcePropType;
  imagePath: ImageSourcePropType;
  inFocus: boolean;
  nameScreen: string;
  onPress: () => void;
};

const BottomTab: React.FC<BottomTabProps> = ({
  inFocusImagePath,
  imagePath,
  inFocus = false,
  nameScreen = '',
  onPress = () => {},
}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.tabWrapper} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Image source={inFocus ? inFocusImagePath : imagePath} style={styles.tabImage} />
      </View>
      <Text
        color={inFocus ? colors.primary : colors.gray}
        fontSize={12}
        weight={TextWeight.Bold}
      >
        {nameScreen}
      </Text>
    </TouchableOpacity>
  );
};

const BottomBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);
  const onPressTab = (tabName: BottomBarStackRoutes) => {
    navigation.navigate(tabName, { screen: tabName });
  };

  const renderTab = ({ name: tabName }: { name: string }, index: number) =>
    bottomBarConfig[tabName as BottomBarStackRoutes] && (
      <BottomTab
        key={index}
        imagePath={bottomBarConfig[tabName as BottomBarStackRoutes].imagePath}
        inFocus={state.index === index}
        inFocusImagePath={
          bottomBarConfig[tabName as BottomBarStackRoutes].activeImagePath
        }
        nameScreen={bottomBarConfig[tabName as BottomBarStackRoutes].screenName}
        onPress={() => onPressTab(tabName as BottomBarStackRoutes)}
      />
    );
  return <View style={styles.container}>{state.routes.map(renderTab)}</View>;
};

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      borderTopWidth: 1,
      borderColor: colors.lightGray,
      marginBottom: 0,
      paddingBottom: insets.bottom ? insets.bottom - 8 : 0,
    },
    tabWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
    },
    label: {
      marginTop: 4,
    },
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabImage: {
      width: 24,
      height: 24,
    },
  });

export default BottomBar;
