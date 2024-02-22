import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import bottomBarConfig from '../config/bottom-bar';
import BottomBar from '@components/BottomBar';
import screens from '../screens';
import MainStack from './MainStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (): React.ReactElement => (
  <Tab.Navigator
    initialRouteName={bottomBarConfig.MainStack.label}
    tabBar={(props) => <BottomBar {...props} />}
  >
    {Object.values(bottomBarConfig).map((bottomBar) => (
      <Tab.Screen
        key={bottomBar.label}
        component={bottomBar.label === 'MainStack' ? MainStack : screens[bottomBar.label]}
        name={bottomBar.label}
        options={{
          headerShown: bottomBar.headerShown,
        }}
      />
    ))}
  </Tab.Navigator>
);

export default BottomTabNavigator;
