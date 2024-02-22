import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export enum RootRoutes {
  BottomBarStack = 'BottomBarStack',
}

export type RootParamList = {
  [RootRoutes.BottomBarStack]: undefined;
};

export type RootScreenProps<RouteName extends RootRoutes> = StackScreenProps<
  RootParamList,
  RouteName
>;

export type RootNavigationProps = StackNavigationProp<RootParamList>;
