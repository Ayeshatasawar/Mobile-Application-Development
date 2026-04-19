import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';
import { checkUserExists, storeUserData } from '../utils/storage';

const AuthenticationScreen = () => {
  const [name, setName] = useState('');
  const [sapId, setSapId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AppContext);

  const defaultCourses = [
    { id: '1', name: 'Data Structures', timing: 'Monday & Wednesday - 10:00 AM', instructor: 'Dr. Smith', credits: 3, room: 'Room 101' },
    { id: '2', name: 'Algorithms', timing: 'Tuesday & Thursday - 11:00 AM', instructor: 'Prof. Johnson', credits: 3, room: 'Room 102' },
    { id: '3', name: 'Database Systems', timing: 'Monday & Wednesday - 2:00 PM', instructor: 'Dr. Williams', credits: 4, room: 'Room 103' },
    { id: '4', name: 'Web Development', timing: 'Tuesday & Thursday - 3:00 PM', instructor: 'Prof. Brown', credits: 3, room: 'Room 104' },
    { id: '5', name: 'Operating Systems', timing: 'Friday - 9:00 AM', instructor: 'Dr. Davis', credits: 3, room: 'Room 105' },
    { id: '6', name: 'Computer Networks', timing: 'Monday - 4:00 PM', instructor: 'Prof. Miller', credits: 3, room: 'Room 106' },
    { id: '7', name: 'Software Engineering', timing: 'Wednesday - 4:00 PM', instructor: 'Dr. Wilson', credits: 3, room: 'Room 107' },
  ];

  const createStudentData = (name, sapId, email, password) => ({
    name: name,
    sapId: sapId,
    email: email,
    password: password,
    semester: '3rd Semester',
    gpa: '3.6',
    cgpa: '3.4',
    profilePicture: null,
    courses: defaultCourses,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    const checkUserPromise = () => {
      return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const result = await checkUserExists(email, password);
          if (result.exists) {
            resolve(result.userData);
          } else {
            reject(new Error('Invalid email or password'));
          }
        }, 1000);
      });
    };

    checkUserPromise()
      .then((userData) => {
        login(userData);
        Alert.alert('Success', 'Logged in successfully!');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignup = async () => {
    if (!name || !sapId || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const existingUser = await checkUserExists(email, password);
      
      if (existingUser.exists) {
        Alert.alert('Error', 'User already exists. Please login.');
        setLoading(false);
        return;
      }

      const studentData = createStudentData(name, sapId, email, password);
      const success = await storeUserData(studentData);
      
      if (success) {
        login(studentData);
        Alert.alert('Success', 'Account created successfully!');
      } else {
        Alert.alert('Error', 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGBw3kBJmtr6U790Ol2G6AZX83sO2pNDfDRA&s' }}
      style={styles.background}
      blurRadius={1}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <View style={styles.header}>
              <View style={styles.logoCircle}>
                <Icon name="school" size={70} color="#08344dff" />
              </View>
              <Text style={styles.title}>Student Portal</Text>
              <Text style={styles.subtitle}>Manage your academic journey</Text>
            </View>

            <View style={styles.formContainer}>
              {!isLogin && (
                <>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputContainer}>
                      <Icon name="person" size={30} color="#0b2d3fff" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>SAP ID</Text>
                    <View style={styles.inputContainer}>
                      <Icon name="badge" size={20} color="#4ECDC4" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your SAP ID"
                        placeholderTextColor="#999"
                        value={sapId}
                        onChangeText={setSapId}
                        autoCapitalize="characters"
                      />
                    </View>
                  </View>
                </>
              )}

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <Icon name="email" size={20} color="#45B7D1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="example@gmail.com"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <Icon name="lock" size={20} color="#96CEB4" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>

              {!isLogin && password.length > 0 && password.length < 6 && (
                <Text style={styles.errorText}>Password must be at least 6 characters</Text>
              )}

              {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={isLogin ? handleLogin : handleSignup}
                  >
                    <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setIsLogin(!isLogin);
                      setName('');
                      setSapId('');
                      setEmail('');
                      setPassword('');
                    }}
                    style={styles.switchButton}
                  >
                    <Text style={styles.switchText}>
                      {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f7f7f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f7f7f7ff',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#11415aff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#07537dff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  switchText: {
    color: '#0b5780ff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#11415aff',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default AuthenticationScreen;