import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MainScreenProps, MainStackRoutes } from '@shared/const/routerMain';
import { useSelector } from 'react-redux';
import { getDiscounts, updateFavoriteStatus } from '@store/slices/Discounts';
import CategoryDiscountCard from './CategoryDiscountCard';
import { DiscountsType } from '@store/types/Discounts.types';
import { DiscountItemType } from '@shared/types';
import { useAppDispatch } from '../../../hooks';
import { addFavorite, removeFavorite } from '@store/slices/Favorites';
import Text, { TextWeight } from '@components/Text';
import { CompositeScreenProps } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { DiscountsRoutes, DiscountsScreenProps } from '@shared/const/routerDiscounts';
import { getCategoryId } from '@store/slices/Category';

type NavigationProps = CompositeScreenProps<
  DiscountsScreenProps<DiscountsRoutes.CategoryDiscounts>,
  MainScreenProps<MainStackRoutes.DiscountDetail>
>;

const CategoryDiscounts: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const categoryId = useSelector(getCategoryId);
  const discounts = useSelector(getDiscounts);

  const scrollViewRef = useRef<FlatList>(null);

  const [filteredDiscounts, setFilteredDiscounts] = useState<DiscountsType | null>(null);

  const getFilteredDiscounts = useCallback(() => {
    const data = discounts.find((category) => category.id === categoryId);
    data && setFilteredDiscounts(data);
  }, [categoryId, discounts]);

  const addDiscountToFavorites = (item: DiscountItemType) => {
    dispatch(updateFavoriteStatus({ categoryId, itemId: item.id }));
    if (item.isSavedToFavorites) {
      dispatch(removeFavorite(item.id));
      return;
    }
    dispatch(
      addFavorite({
        ...item,
        isSavedToFavorites: !item.isSavedToFavorites,
      })
    );
  };

  const onPressDiscountCard = (id: number) => {
    navigation.navigate(MainStackRoutes.DiscountDetail, {
      id,
    });
  };

  const renderItem = ({ item, index }: { item: DiscountItemType; index: number }) => (
    <CategoryDiscountCard
      addToFavorites={() => addDiscountToFavorites(item)}
      containerStyles={styles.card}
      index={index}
      item={item}
      onPress={onPressDiscountCard}
    />
  );

  useEffect(() => {
    getFilteredDiscounts();
  }, [getFilteredDiscounts]);

  useEffect(() => {
    if (categoryId >= 0) {
      scrollViewRef.current?.scrollToIndex({
        index: 0,
        viewPosition: 0,
        viewOffset: 76,
      });
    }
  }, [categoryId]);
  return (
    <View style={styles.container}>
      {filteredDiscounts?.data.length ? (
        <FlatList
          ref={scrollViewRef}
          contentContainerStyle={styles.contentContainer}
          data={filteredDiscounts.data}
          keyExtractor={(item, index) => `discounts-${item.id}-${index}`}
          ListHeaderComponent={
            <Text fontSize={28} lineHeight={28} weight={TextWeight.Bold}>
              {filteredDiscounts.name}
            </Text>
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={(error) => {
            const offset = error.averageItemLength * error.index;
            scrollViewRef.current?.scrollToOffset({ offset });
            setTimeout(
              () => scrollViewRef.current?.scrollToIndex({ index: error.index }),
              100
            );
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // flex: 1,
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 24,
    paddingBottom: 16,
    paddingTop: 24,
  },
  card: {
    marginBottom: 8,
  },
});

export default CategoryDiscounts;
