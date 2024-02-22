import { createStackNavigator } from '@react-navigation/stack';
import screens from '../screens';
import React from 'react';
import { DiscountsParamList, DiscountsRoutes } from '@shared/const/routerDiscounts';
import { CategoryDiscounts } from '@screens/CategoryDiscounts';
const DiscountsStackNav = createStackNavigator<DiscountsParamList>();

const DiscountsStack = (): React.ReactElement => (
  <DiscountsStackNav.Navigator
    initialRouteName={DiscountsRoutes.Home}
    screenOptions={{
      animationEnabled: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      gestureResponseDistance: 800,
    }}
  >
    <DiscountsStackNav.Screen
      component={screens.Home}
      name={DiscountsRoutes.Home}
      options={{
        headerShown: false,
      }}
    />
    <DiscountsStackNav.Screen
      component={CategoryDiscounts}
      name={DiscountsRoutes.CategoryDiscounts}
      options={{
        headerShown: false,
      }}
    />
  </DiscountsStackNav.Navigator>
);

export default DiscountsStack;
