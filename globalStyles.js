import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';

const CourseDetailScreen = ({ route, navigation }) => {
  const { course } = route.params;
  const { isDarkTheme } = useContext(AppContext);

  const DetailItem = ({ icon, label, value }) => (
    <View style={[styles.detailItem, isDarkTheme && styles.darkDetailItem]}>
      <Icon name={icon} size={24} color="#007AFF" />
      <View style={styles.detailContent}>
        <Text style={[styles.detailLabel, isDarkTheme && styles.darkSubText]}>{label}</Text>
        <Text style={[styles.detailValue, isDarkTheme && styles.darkText]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      
      <View style={[styles.header, isDarkTheme && styles.darkHeader]}>
        <View style={[styles.iconCircle, { backgroundColor: '#007AFF20' }]}>
          <Icon name="menu-book" size={50} color="#007AFF" />
        </View>
        <Text style={[styles.courseTitle, isDarkTheme && styles.darkText]}>{course.name}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <DetailItem icon="schedule" label="Timing" value={course.timing} />
        <DetailItem icon="person" label="Instructor" value={course.instructor} />
        <DetailItem icon="star" label="Credits" value={`${course.credits} credits`} />
        <DetailItem icon="location-on" label="Room" value={course.room || 'Online'} />
      </View>

      <View style={[styles.infoCard, isDarkTheme && styles.darkInfoCard]}>
        <Text style={[styles.infoTitle, isDarkTheme && styles.darkText]}>Course Description</Text>
        <Text style={[styles.infoText, isDarkTheme && styles.darkSubText]}>
          This course covers fundamental concepts and practical applications of {course.name}. 
          Students will learn through lectures, hands-on exercises, and projects.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
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
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  darkHeader: {
    backgroundColor: '#282828ff',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkDetailItem: {
    backgroundColor: '#282828ff',
  },
  detailContent: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkInfoCard: {
    backgroundColor: '#2d2d2dff',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CourseDetailScreen;