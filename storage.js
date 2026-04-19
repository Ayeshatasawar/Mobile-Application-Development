import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActionSheetIOS,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../context/AppContext';
import { updateUserData } from '../utils/storage';

const EditProfileScreen = ({ navigation }) => {
  const { studentData, updateStudentData, isDarkTheme } = useContext(AppContext);
  const [name, setName] = useState(studentData.name || '');
  const [sapId, setSapId] = useState(studentData.sapId || '');
  const [semester, setSemester] = useState(studentData.semester || '');
  const [gpa, setGpa] = useState(studentData.gpa || '');
  const [cgpa, setCgpa] = useState(studentData.cgpa || '');
  const [profilePicture, setProfilePicture] = useState(studentData.profilePicture || null);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera and gallery permissions to change profile picture');
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const takePhotoFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery', 'Remove Photo'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 3,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            takePhotoFromCamera();
          } else if (buttonIndex === 2) {
            pickImageFromGallery();
          } else if (buttonIndex === 3) {
            setProfilePicture(null);
          }
        }
      );
    } else {
      Alert.alert(
        'Change Profile Picture',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Take Photo', onPress: takePhotoFromCamera },
          { text: 'Choose from Gallery', onPress: pickImageFromGallery },
          { text: 'Remove Photo', onPress: () => setProfilePicture(null), style: 'destructive' },
        ],
        { cancelable: true }
      );
    }
  };

  const handleSave = async () => {
    if (!name || !sapId) {
      Alert.alert('Error', 'Name and SAP ID are required');
      return;
    }

    const updatedData = {
      ...studentData,
      name,
      sapId,
      semester,
      gpa,
      cgpa,
      profilePicture,
    };

    const success = await updateUserData(updatedData);
    if (success) {
      updateStudentData(updatedData);
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          style={[styles.container, isDarkTheme && styles.darkContainer]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
          
          <View style={[styles.header, isDarkTheme && styles.darkHeader]}>
            <TouchableOpacity onPress={showImagePickerOptions} style={styles.profileImageContainer}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profileImage} />
              ) : (
                <View style={[styles.profilePlaceholder, isDarkTheme && styles.darkProfilePlaceholder]}>
                  <Text style={styles.profileInitial}>
                    {name ? name.charAt(0).toUpperCase() : studentData.name?.charAt(0).toUpperCase() || 'J'}
                  </Text>
                </View>
              )}
              <View style={styles.editIconOverlay}>
                <Icon name="camera-alt" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, isDarkTheme && styles.darkText]}>Edit Profile</Text>
            <Text style={[styles.headerSubtitle, isDarkTheme && styles.darkSubText]}>
              Tap on profile picture to change
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDarkTheme && styles.darkText]}>Full Name *</Text>
              <View style={[styles.inputContainer, isDarkTheme && styles.darkInputContainer]}>
                <Icon name="person" size={20} color="#FF6B6B" />
                <TextInput
                  style={[styles.input, isDarkTheme && styles.darkInput]}
                  placeholder="Enter your full name"
                  placeholderTextColor={isDarkTheme ? '#888' : '#999'}
                  value={name}
                  onChangeText={setName}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDarkTheme && styles.darkText]}>SAP ID *</Text>
              <View style={[styles.inputContainer, isDarkTheme && styles.darkInputContainer]}>
                <Icon name="badge" size={20} color="#4ECDC4" />
                <TextInput
                  style={[styles.input, isDarkTheme && styles.darkInput]}
                  placeholder="Enter your SAP ID"
                  placeholderTextColor={isDarkTheme ? '#888' : '#999'}
                  value={sapId}
                  onChangeText={setSapId}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDarkTheme && styles.darkText]}>Semester</Text>
              <View style={[styles.inputContainer, isDarkTheme && styles.darkInputContainer]}>
                <Icon name="class" size={20} color="#45B7D1" />
                <TextInput
                  style={[styles.input, isDarkTheme && styles.darkInput]}
                  placeholder="e.g., 3rd Semester"
                  placeholderTextColor={isDarkTheme ? '#888' : '#999'}
                  value={semester}
                  onChangeText={setSemester}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={[styles.label, isDarkTheme && styles.darkText]}>GPA</Text>
                <View style={[styles.inputContainer, isDarkTheme && styles.darkInputContainer]}>
                  <Icon name="star" size={20} color="#FF9800" />
                  <TextInput
                    style={[styles.input, isDarkTheme && styles.darkInput]}
                    placeholder="3.6"
                    placeholderTextColor={isDarkTheme ? '#888' : '#999'}
                    value={gpa}
                    onChangeText={setGpa}
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={[styles.label, isDarkTheme && styles.darkText]}>CGPA</Text>
                <View style={[styles.inputContainer, isDarkTheme && styles.darkInputContainer]}>
                  <Icon name="trending-up" size={20} color="#2196F3" />
                  <TextInput
                    style={[styles.input, isDarkTheme && styles.darkInput]}
                    placeholder="3.4"
                    placeholderTextColor={isDarkTheme ? '#888' : '#999'}
                    value={cgpa}
                    onChangeText={setCgpa}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Icon name="save" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkHeader: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#11415aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkProfilePlaceholder: {
    backgroundColor: '#1494daff',
  },
  profileInitial: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  editIconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    height: 50,
  },
  darkInputContainer: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  darkInput: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#11415aff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default EditProfileScreen;