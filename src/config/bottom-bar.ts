import {
  HeartActiveIcon,
  HeartIcon,
  SaleActiveIcon,
  SaleIcon,
  UserIcon,
} from '@assets/icons';
import { ImageSourcePropType } from 'react-native';
import { BottomBarStackRoutes } from '@shared/const/routerBottomBar';

export type BottomBarItem = {
  label: BottomBarStackRoutes;
  screenName: string;
  headerShown: boolean;
  activeImagePath: ImageSourcePropType;
  imagePath: ImageSourcePropType;
};

const bottomBarConfig: { [key in BottomBarStackRoutes]: BottomBarItem } = {
  [BottomBarStackRoutes.MainStack]: {
    label: BottomBarStackRoutes.MainStack,
    screenName: 'Скидки',
    headerShown: false,
    activeImagePath: SaleActiveIcon,
    imagePath: SaleIcon,
  },
  [BottomBarStackRoutes.Favorites]: {
    label: BottomBarStackRoutes.Favorites,
    screenName: 'Избранное',
    headerShown: false,
    activeImagePath: HeartActiveIcon,
    imagePath: HeartIcon,
  },
  [BottomBarStackRoutes.Profile]: {
    label: BottomBarStackRoutes.Profile,
    screenName: 'Аккаунт',
    headerShown: false,
    activeImagePath: UserIcon,
    imagePath: UserIcon,
  },
};

export default bottomBarConfig;
