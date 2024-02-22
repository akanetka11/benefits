import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { DiscountsRoutes } from './routerDiscounts';

export enum MainStackRoutes {
  DiscountsStack = 'DiscountsStack',
  DiscountDetail = 'DiscountDetail',
}

export type MainStackParamList = {
  [MainStackRoutes.DiscountsStack]: {
    screen: DiscountsRoutes;
    params?: unknown;
  };
  [MainStackRoutes.DiscountDetail]: {
    id: number;
  };
};

export type MainScreenProps<RouteName extends MainStackRoutes> = StackScreenProps<
  MainStackParamList,
  RouteName
>;

export type MainNavigationProps = StackNavigationProp<MainStackParamList>;
