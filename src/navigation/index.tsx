import { createStackNavigator } from '@react-navigation/stack';
import { RootParamList, RootRoutes } from '@shared/const/routerRoot';
import BottomTabNavigator from './BottomBar';
import { colors } from '@styles/index';
import React from 'react';

const RootStack = createStackNavigator<RootParamList>();

const RootStackApp = (): React.ReactElement => (
  <RootStack.Navigator
    initialRouteName={RootRoutes.BottomBarStack}
    screenOptions={{
      headerStyle: { elevation: 0 },
      cardStyle: { backgroundColor: colors.white },
    }}
  >
    <RootStack.Screen
      component={BottomTabNavigator}
      name={RootRoutes.BottomBarStack}
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);

export default RootStackApp;
