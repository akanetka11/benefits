import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootStackApp from './navigation';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import _SplashScreen from './SplashScreen';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  SplashScreen.preventAutoHideAsync();

  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    'SF-UI-Display-Bold': require('./assets/fonts/SF-UI-Display-Bold.ttf'),
    'SF-UI-Display-Medium': require('./assets/fonts/SF-UI-Display-Medium.ttf'),
    'SF-UI-Display-Regular': require('./assets/fonts/SF-UI-Display-Regular.ttf'),
  });

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const onLayout = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  }, [fontError, fontsLoaded]);

  useEffect(() => {
    onLayout();
  }, [onLayout]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <_SplashScreen />
      ) : (
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <SafeAreaProvider>
              <NavigationContainer theme={theme}>
                <RootStackApp />
              </NavigationContainer>
            </SafeAreaProvider>
          </Provider>
        </PersistGate>
      )}
    </>
  );
};

registerRootComponent(App);
