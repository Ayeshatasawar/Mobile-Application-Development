import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from '../screens/AuthenticationScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;