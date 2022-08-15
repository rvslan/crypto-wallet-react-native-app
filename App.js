import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './navigation/tabs';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'MainLayout'}
      >
        <Stack.Screen name='MainLayout' component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
