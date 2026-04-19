import React, { createContext, useState, useEffect } from 'react';
import { getUserData, getTheme, storeTheme } from '../utils/storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [studentData, setStudentData] = useState({
    name: 'John Doe',
    sapId: '2024-CS-101',
    email: '',
    password: '',
    semester: '3rd Semester',
    gpa: '3.6',
    cgpa: '3.4',
    profilePicture: null,
  });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    // Load theme
    const theme = await getTheme();
    setIsDarkTheme(theme === 'dark');
    
    // Load user data
    const userData = await getUserData();
    if (userData) {
      setStudentData(userData);
      setIsLoggedIn(true);
    }
  };

  const updateStudentData = async (newData) => {
    const updatedData = { ...studentData, ...newData };
    setStudentData(updatedData);
    await storeUserData(updatedData);
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await storeTheme(newTheme ? 'dark' : 'light');
  };

  const login = (userData) => {
    setStudentData(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    setStudentData({
      name: '',
      sapId: '',
      email: '',
      password: '',
      semester: '',
      gpa: '',
      cgpa: '',
      profilePicture: null,
    });
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{
      studentData,
      isDarkTheme,
      isLoggedIn,
      updateStudentData,
      toggleTheme,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};