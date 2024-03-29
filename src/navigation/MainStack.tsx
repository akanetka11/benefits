import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList, MainStackRoutes } from '@shared/const/routerMain';
import React from 'react';
import { DiscountDetail } from '@screens/DiscountDetail';
import DiscountsStack from './DiscountsStack';
import { FireIcon, FireInactiveIcon } from '@assets/icons';
import categories from '@config/categories.json';
import { CategoriesTabBar } from '@components/ui';
import { getCategoryId } from '@store/slices/Category';
import { useAppSelector } from '@shared/hooks';
const MainStackNav = createStackNavigator<MainStackParamList>();

const MainStack = (): React.ReactElement => {
  const selectedCategoryId = useAppSelector(getCategoryId);
  return (
    <MainStackNav.Navigator initialRouteName={MainStackRoutes.DiscountsStack}>
      <MainStackNav.Screen
        component={DiscountDetail}
        name={MainStackRoutes.DiscountDetail}
        options={{
          headerShown: false,
        }}
      />
      <MainStackNav.Screen
        component={DiscountsStack}
        name={MainStackRoutes.DiscountsStack}
        options={{
          animationEnabled: false,
          header: () => (
            <CategoriesTabBar
              data={[
                {
                  id: 0,
                  name: 'Все скидки',
                  isDefault: true,
                  icon: selectedCategoryId === 0 ? FireIcon : FireInactiveIcon,
                },
                ...categories.data,
              ]}
            />
          ),
        }}
      />
    </MainStackNav.Navigator>
  );
};

export default MainStack;
