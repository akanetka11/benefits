import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export enum DiscountsRoutes {
  Home = 'Home',
  CategoryDiscounts = 'CategoryDiscounts',
}

export type DiscountsParamList = {
  [DiscountsRoutes.Home]: undefined;
  [DiscountsRoutes.CategoryDiscounts]: undefined;
};

export type DiscountsScreenProps<RouteName extends DiscountsRoutes> = StackScreenProps<
  DiscountsParamList,
  RouteName
>;

export type DiscountsNavigationProps = StackNavigationProp<DiscountsParamList>;
