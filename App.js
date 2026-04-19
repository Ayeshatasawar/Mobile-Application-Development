import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';
import { getUserData, updateTheme } from '../utils/storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { studentData, isDarkTheme, updateStudentData, toggleTheme } = useContext(AppContext);
  const [themePreview, setThemePreview] = useState(isDarkTheme);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUserData();
        if (data) {
          updateStudentData(data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  const handleThemeToggle = async (value) => {
    setThemePreview(value);
    await updateTheme(value);
    toggleTheme();
  };

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'S';

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Hero Banner */}
        <ImageBackground 
          source={{ uri: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600' }}
          style={styles.heroBanner}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Welcome to Student Portal</Text>
            <Text style={styles.heroSubtitle}>Your Gateway to Academic Success</Text>
          </View>
        </ImageBackground>

        {/* Welcome Header */}
        <View style={styles.welcomeHeader}>
          <View>
            <Text style={[styles.welcomeText, isDarkTheme && styles.darkSubText]}>Welcome back,</Text>
            <Text style={[styles.name, { color: '#11415aff' }]}>{studentData.name?.split(' ')[0] || 'Ayesha'}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.profileImage, { backgroundColor: '#11415aff' }]} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            {studentData.profilePicture ? 
              <Image source={{ uri: studentData.profilePicture }} style={styles.profilePic} /> : 
              <Text style={styles.initials}>{getInitials(studentData.name) || 'A'}</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, isDarkTheme && styles.darkStatCard]}>
            <Icon name="star" size={30} color={isDarkTheme ? "#FFD700" : "#11415aff"} />
            <Text style={[styles.statValue, isDarkTheme && styles.darkText]}>{studentData.gpa || '3.8'}</Text>
            <Text style={[styles.statLabel, isDarkTheme && styles.darkSubText]}>Current GPA</Text>
          </View>
          <View style={[styles.statCard, isDarkTheme && styles.darkStatCard]}>
            <Icon name="trending-up" size={30} color={isDarkTheme ? "#4ECDC4" : "#4ECDC4"} />
            <Text style={[styles.statValue, isDarkTheme && styles.darkText]}>{studentData.cgpa || '3.7'}</Text>
            <Text style={[styles.statLabel, isDarkTheme && styles.darkSubText]}>CGPA</Text>
          </View>
          <View style={[styles.statCard, isDarkTheme && styles.darkStatCard]}>
            <Icon name="book" size={30} color={isDarkTheme ? "#b856d6ff" : "#FF9800"} />
            <Text style={[styles.statValue, isDarkTheme && styles.darkText]}>{studentData.courses?.length || 7}</Text>
            <Text style={[styles.statLabel, isDarkTheme && styles.darkSubText]}>Active Courses</Text>
          </View>
        </View>

        {/* Student Info Card */}
        <View style={[styles.infoCard, isDarkTheme && styles.darkInfoCard]}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.darkText]}>Student Information</Text>
          <View style={styles.infoRow}>
            <Icon name="badge" size={22} color={isDarkTheme ? "#1b596cff" : "#11415aff"} />
            <Text style={[styles.infoLabel, isDarkTheme && styles.darkText]}>SAP ID:</Text>
            <Text style={[styles.infoValue, isDarkTheme && styles.darkSubText]}>{studentData.sapId || 'SAP122976'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="event" size={22} color={isDarkTheme ? "#1b596cff" : "#11415aff"} />
            <Text style={[styles.infoLabel, isDarkTheme && styles.darkText]}>Semester:</Text>
            <Text style={[styles.infoValue, isDarkTheme && styles.darkSubText]}>{studentData.semester || 'Fall 2024'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="email" size={22} color={isDarkTheme ? "#1b596cff" : "#11415aff"} />
            <Text style={[styles.infoLabel, isDarkTheme && styles.darkText]}>Email:</Text>
            <Text style={[styles.infoValue, isDarkTheme && styles.darkSubText]}>{studentData.email || 'ayesha@example.com'}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, styles.actionsHeader, isDarkTheme && styles.darkText]}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionCard, isDarkTheme && styles.darkActionCard]}
            onPress={() => navigation.navigate('EnrolledCourses')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: isDarkTheme ? '#5b8da040' : '#2951673b' }]}>
              <Icon name="menu-book" size={30} color={isDarkTheme ? "#24cfc7ff" : "#11415aff"} />
            </View>
            <Text style={[styles.actionText, isDarkTheme && styles.darkText]}>My Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, isDarkTheme && styles.darkActionCard]}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: isDarkTheme ? '#4CAF5040' : '#4CAF5025' }]}>
              <Icon name="edit" size={30} color={isDarkTheme ? "#4CAF50" : "#4CAF50"} />
            </View>
            <Text style={[styles.actionText, isDarkTheme && styles.darkText]}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, isDarkTheme && styles.darkActionCard]}
            onPress={() => navigation.navigate('Settings')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: isDarkTheme ? '#2196F340' : '#2196F325' }]}>
              <Icon name="settings" size={30} color={isDarkTheme ? "#2196F3" : "#2196F3"} />
            </View>
            <Text style={[styles.actionText, isDarkTheme && styles.darkText]}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Theme Switch */}
        <View style={[styles.themeSwitch, isDarkTheme && styles.darkThemeSwitch]}>
          <View style={styles.themeInfo}>
            <Icon name="dark-mode" size={24} color={isDarkTheme ? "#FFD700" : "#11415aff"} />
            <Text style={[styles.themeText, isDarkTheme && styles.darkText]}>Dark Mode</Text>
          </View>
          <Switch 
            value={themePreview} 
            onValueChange={handleThemeToggle} 
            trackColor={{ false: '#767577', true: '#11415aff' }} 
            thumbColor={themePreview ? '#f4f3f4' : '#f4f3f4'} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  heroBanner: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 15,
    marginBottom: 20,
  },
  heroImage: {
    borderRadius: 20,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  initials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  darkStatCard: {
    backgroundColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  darkInfoCard: {
    backgroundColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    marginRight: 8,
    color: '#333',
  },
  infoValue: {
    fontSize: 15,
    flex: 1,
    color: '#666',
  },
  actionsHeader: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  darkActionCard: {
    backgroundColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  actionIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  themeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 18,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  darkThemeSwitch: {
    backgroundColor: '#2C2C2C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubText: {
    color: '#CCCCCC',
  },
});

export default HomeScreen;