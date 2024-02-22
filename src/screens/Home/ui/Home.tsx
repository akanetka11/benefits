import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import data from '@config/discounts.json';
import newData from '@config/new.json';
import DiscountCard from './components/DiscountCard';
import Text, { TextWeight } from '@components/Text';
import { colors } from '../../../styles';
import { DiscountItemType } from '@shared/types';
import { useAppDispatch } from '../../../hooks';
import {
  getDiscounts,
  getNewDiscounts,
  setCategoryId,
  setDiscounts,
  setNewDiscounts,
} from '@store/slices/Discounts';
import { useSelector } from 'react-redux';
import { MainScreenProps, MainStackRoutes } from '@shared/const/routerMain';
import ViewMoreCard from './components/ViewMoreCard';
import { useFocusEffect } from '@react-navigation/core';
import { CompositeScreenProps } from '@react-navigation/native';
import { DiscountsRoutes, DiscountsScreenProps } from '@shared/const/routerDiscounts';

type NavigationProps = CompositeScreenProps<
  DiscountsScreenProps<DiscountsRoutes.Home>,
  MainScreenProps<MainStackRoutes.DiscountDetail>
>;

const Home: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const discounts = useSelector(getDiscounts);
  const newDiscounts = useSelector(getNewDiscounts);

  const onPressDiscountCard = (id: number) => {
    navigation.navigate(MainStackRoutes.DiscountDetail, {
      id,
    });
  };

  const viewAllCategoryDiscounts = (categoryId: number) => {
    dispatch(setCategoryId(categoryId));
    navigation.navigate(DiscountsRoutes.CategoryDiscounts);
  };

  const getDiscountsData = () => {
    if (!discounts.length) {
      dispatch(setDiscounts(data.discounts));
    }
    dispatch(setNewDiscounts(newData));
  };

  useEffect(() => {
    getDiscountsData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(setCategoryId(0));
    }, [])
  );
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text
        fontSize={20}
        lineHeight={28}
        style={styles.categoryName}
        weight={TextWeight.Bold}
      >
        {newData.name}
      </Text>
      <FlatList
        horizontal
        contentContainerStyle={styles.itemsContainer}
        data={newDiscounts?.data}
        keyExtractor={(item, index) => `discounts-${item.id}-${index}`}
        renderItem={({ item }: ListRenderItemInfo<DiscountItemType>) => (
          <DiscountCard
            key={item.id}
            isNew
            item={item}
            onPress={() => onPressDiscountCard(item.id)}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
      {discounts.map((category) => {
        const showMore = category.data.length > 4;
        const categoryData = [...category.data];
        if (showMore) {
          categoryData.splice(4);
        }
        return (
          <View key={category.id}>
            <View style={styles.flexContainer}>
              <Text fontSize={20} lineHeight={24} weight={TextWeight.Bold}>
                {category.name}
              </Text>
              <TouchableOpacity
                style={styles.viewAll}
                onPress={() => viewAllCategoryDiscounts(category.id)}
              >
                <Text color={colors.primary} fontSize={14} weight={TextWeight.Bold}>
                  Все
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              contentContainerStyle={styles.itemsContainer}
              data={categoryData}
              keyExtractor={(item, index) => `discounts-${item.id}-${index}`}
              ListFooterComponent={
                showMore ? (
                  <ViewMoreCard
                    numberOfDiscounts={category.data.length - 4}
                    onPress={() => viewAllCategoryDiscounts(category.id)}
                  />
                ) : null
              }
              renderItem={({ item }: ListRenderItemInfo<DiscountItemType>) => (
                <DiscountCard
                  key={item.id}
                  item={item}
                  onPress={() => onPressDiscountCard(item.id)}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 16,
  },
  categoryName: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  itemsContainer: {
    gap: 8,
    paddingHorizontal: 16,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  viewAll: {
    // padding: 10,
  },
});

export default Home;
