import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { MainStackRoutes } from './routerMain';

export enum BottomBarStackRoutes {
  MainStack = 'MainStack',
  Favorites = 'Favorites',
  Profile = 'Profile',
}

export type BottomBarStackParamList = {
  [BottomBarStackRoutes.MainStack]: {
    screen: MainStackRoutes;
    params?: unknown;
  };
  [BottomBarStackRoutes.Favorites]: undefined;
  [BottomBarStackRoutes.Profile]: undefined;
};

export type BottomBarScreenProps<RouteName extends BottomBarStackRoutes> =
  StackScreenProps<BottomBarStackParamList, RouteName>;

export type BottomBarNavigationProps = StackNavigationProp<BottomBarStackParamList>;
