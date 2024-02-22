import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import Text, { TextWeight } from '@components/Text';
import { useSelector } from 'react-redux';
import { getFavorites, removeFavorite } from '@store/slices/Favorites';
import CategoryDiscountCard from '../../CategoryDiscounts/ui/CategoryDiscountCard';
import { useAppDispatch } from '@hooks/index';
import FavoritesEmptyView from './FavoritesEmptyView';
import { updateFavoriteStatus } from '@store/slices/Discounts';
import { DiscountItemType } from '@shared/types';

export type LastDeletedItemType = {
  item: DiscountItemType | null;
  index: number | null;
} | null;

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  const favorites = useSelector(getFavorites);

  const [lastDeletedItem, setLastDeletedItem] = useState<LastDeletedItemType>(null);
  const [deletedItemHeight, setDeletedItemHeight] = useState(0);

  const listRef = useRef<FlatList>(null);

  const deleteDiscountFromFavorites = () => {
    if (
      lastDeletedItem?.index !== null &&
      lastDeletedItem?.item?.id !== (null || undefined)
    ) {
      const { item } = lastDeletedItem;
      dispatch(
        updateFavoriteStatus({
          categoryId: item.categoryId,
          itemId: item.id,
        })
      );
      dispatch(removeFavorite(item.id));
      setLastDeletedItem(null);
    }
  };

  return (
    <>
      {favorites.length ? (
        <FlatList
          ref={listRef}
          contentContainerStyle={styles.contentContainer}
          data={favorites}
          keyExtractor={(item, index) => `favorites-${item.id}-${index}`}
          ListHeaderComponent={
            <Text fontSize={28} style={styles.title} weight={TextWeight.Bold}>
              Избранное
            </Text>
          }
          renderItem={({ item, index }: ListRenderItemInfo<DiscountItemType>) => (
            <CategoryDiscountCard
              key={item.id}
              containerStyles={styles.cardContainer}
              deletedItemHeight={deletedItemHeight}
              index={index}
              isHeartAnimationEnabled={false}
              item={item}
              itemsCount={favorites.length}
              lastDeletedItem={lastDeletedItem}
              removeFromFavorites={deleteDiscountFromFavorites}
              setDeletedItemHeight={setDeletedItemHeight}
              setLastDeletedItem={setLastDeletedItem}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={styles.container}
        />
      ) : (
        <FavoritesEmptyView />
      )}
    </>
  );
};

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      marginTop: insets.top,
    },
    contentContainer: {
      paddingHorizontal: 16,
    },
    cardContainer: {
      marginBottom: 32,
    },
    title: {
      marginVertical: 24,
    },
  });

export default Favorites;
