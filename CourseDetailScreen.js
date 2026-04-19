import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';

const AppNavigator = () => {
  const { isLoggedIn } = useContext(AppContext);

  return isLoggedIn ? <MainTabNavigator /> : <AuthStack />;
};

export default AppNavigator;