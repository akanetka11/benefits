import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../styles';
import Text, { TextWeight } from './Text';
import { useNavigation } from '@react-navigation/native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch } from '../hooks';
import { useSelector } from 'react-redux';
import { DiscountsNavigationProps, DiscountsRoutes } from '@shared/const/routerDiscounts';
import { getCategoryId, setCategoryId } from '@store/slices/Category';

type CategoryType = {
  id: number;
  name: string;
  isDefault?: boolean;
  icon?: ImageSourcePropType;
};

type TabBarItemProps = {
  item: CategoryType;
  onPress: (T: number, isDefault?: boolean) => void;
  activeCategoryId: number;
  index: number;
};

type CategoriesTabBarProps = {
  data: CategoryType[];
};

const TabBarItem = ({ item, activeCategoryId, onPress, index }: TabBarItemProps) => {
  const { id, name, icon, isDefault } = item;
  const isActive = activeCategoryId === index;
  const insets = useSafeAreaInsets();

  const styles = getStyles(insets);
  return (
    <TouchableOpacity
      key={id}
      style={[styles.item, isActive && styles.itemActive]}
      onPress={() => onPress(index, isDefault)}
    >
      {icon ? <Image source={icon} style={styles.icon} /> : null}
      <Text
        color={isActive ? colors.white : colors.black}
        fontSize={13}
        weight={TextWeight.Bold}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const CategoriesTabBar: React.FC<CategoriesTabBarProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const styles = getStyles(insets);

  const navigation = useNavigation<DiscountsNavigationProps>();

  const activeCategoryId = useSelector(getCategoryId);

  const scrollViewRef = useRef<FlatList>(null);

  const onPressBtn = (id: number, isDefault?: boolean) => {
    dispatch(setCategoryId(id));
    if (isDefault) {
      navigation.navigate(DiscountsRoutes.Home);
    } else {
      navigation.navigate(DiscountsRoutes.CategoryDiscounts);
    }
  };

  useEffect(() => {
    if (activeCategoryId >= 0) {
      scrollViewRef.current?.scrollToIndex({
        index: activeCategoryId,
        viewPosition: 0,
        viewOffset: 16,
      });
    }
  }, [activeCategoryId]);
  return (
    <FlatList
      ref={scrollViewRef}
      contentContainerStyle={styles.contentStyle}
      data={data}
      horizontal={true}
      keyExtractor={(item, index) => `discounts-${item.id}-${index}`}
      renderItem={({ item, index }: ListRenderItemInfo<CategoryType>) => (
        <TabBarItem
          activeCategoryId={activeCategoryId}
          index={index}
          item={item}
          onPress={onPressBtn}
        />
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      onScrollToIndexFailed={(error) => {
        const offset = error.averageItemLength * error.index;
        scrollViewRef.current?.scrollToOffset({ offset });
        setTimeout(
          () => scrollViewRef.current?.scrollToIndex({ index: error.index }),
          100
        );
      }}
    />
  );
};

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top ? insets.top + 16 : 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGray,
    },
    contentStyle: {
      gap: 8,
      paddingHorizontal: 16,
    },
    item: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: colors.lightGray,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemActive: {
      backgroundColor: colors.primary,
    },
    icon: {
      marginRight: 8,
      width: 20,
      height: 20,
    },
  });

export default React.memo(CategoriesTabBar);
