import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext'; // Import the AuthContext

const AuthScreen = ({navigation}) => {
  //const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext); // Access the login function from the AuthContext

 

  const handleLogin = async () => {
    setIsLoading(true); // Show loader

    try {
      const endpoint = 'http://93.127.160.233:3060/api/auth/login';
      const payload = { email, password };

      // Make the API request using axios
      const response = await axios.post(endpoint, payload);

      const { token, user } = response.data;

      // Store the token and user in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Login successful!', `Welcome ${user.name}`);
      setIsLoading(false); // Hide loader
      login();
      

      //navigation.replace('Main'); // Navigate to Home or another screen after auth
    } catch (error) {
      setIsLoading(false); // Hide loader
      console.error(error);
      Alert.alert('Login failed', error.response?.data?.message || 'Something went wrong');
    }
  };
  const handleGoogleLogin = () => {

navigation.navigate('GoogleLogin');

};

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/mfbyforesythebrandcom.jpeg')} style={styles.logo} />

      {/* Welcome text */}
      <Text style={styles.welcomeText}>Welcome To Mfbyforesythebrand</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
     /* Navigate to Signup */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Don't have an account? Sign up.</Text>
      </TouchableOpacity>

      {/* Navigate to Signup */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.signupText}>Forgot your password? Click here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#2D7B30',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#2D7B30',
    borderRadius: 25, // Rounded corners
    marginBottom: 20,
    color: '#2D7B30',
  },
  googleButton: {
  flexDirection: 'row', // Aligns items horizontally
  alignItems: 'center', // Centers content vertically
  justifyContent: 'center', // Centers content horizontally
  backgroundColor: '#FFFFFF',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: '#D9D9D9',
  width: '100%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3, // Adds a subtle shadow effect on Android
},

googleIcon: {
  width: 24,
  height: 24,
  marginRight: 10, // Space between icon and text
},

googleButtonText: {
  color: '#333',
  fontSize: 16,
  fontWeight: 'bold',
},
  button: {
    backgroundColor: '#FF7E00',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    color: '#2D7B30',
    fontSize: 16,
  },
});

export default AuthScreen;