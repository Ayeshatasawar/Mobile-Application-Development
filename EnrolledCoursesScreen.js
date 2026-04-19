import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../context/AppContext';

import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EnrolledCoursesScreen from '../screens/EnrolledCoursesScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator (Nested Navigation)
function HomeStack() {
  const { isDarkTheme } = useContext(AppContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? '#1a1a1a' : '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} options={{ title: 'My Courses' }} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Course Details' }} />
    </Stack.Navigator>
  );
}

// Courses Stack Navigator
function CoursesStack() {
  const { isDarkTheme } = useContext(AppContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? '#1a1a1a' : '#007AFF',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="CoursesList" component={EnrolledCoursesScreen} options={{ title: 'Enrolled Courses' }} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Course Details' }} />
    </Stack.Navigator>
  );
}

// Settings Stack Navigator
function SettingsStack() {
  const { isDarkTheme } = useContext(AppContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? '#1a1a1a' : '#007AFF',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}

const MainTabNavigator = () => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CoursesTab') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDarkTheme ? '#888' : 'gray',
        tabBarStyle: {
          backgroundColor: isDarkTheme ? '#1a1a1a' : '#fff',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="CoursesTab" component={CoursesStack} options={{ title: 'Courses' }} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;