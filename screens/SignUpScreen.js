import React, { useState, useContext} from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext'; // Import the AuthContext


const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for loader
  const { login } = useContext(AuthContext); // Access the login function from the AuthContext

  const handleSignup = async () => {
    setIsLoading(true); // Show loader

    try {
      const endpoint = 'https://api.foodliie.com/api/auth/register';
      const payload = { name, email, password };

      // Make the API request using axios
      const response = await axios.post(endpoint, payload);

      const { token, user } = response.data;

      // Store the token and user in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Signup successful!', `Welcome ${user.name}`);
      setIsLoading(false); // Hide loader
      login();
      //navigation.replace('Main'); // Navigate to Home or another screen after auth
    } catch (error) {
      setIsLoading(false); // Hide loader
      console.error(error);
      Alert.alert('Signup failed', error.response?.data?.message || 'Something went wrong');
    }
  };
  const handleGoogleLogin = () => {
  navigation.navigate('GoogleLogin');
};

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/App 1024x1024px.jpg')} style={styles.logo} />

      {/* Welcome text */}
      <Text style={styles.welcomeText}>Join Market Picks</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

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
                {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
        {/* Google Login Button */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.signupText}>Forgot your password? Reset it.</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
        <Text style={styles.signupText}>Already have an account? Login here</Text>
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
  forgotPasswordText: {
    color: '#FF7E00',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 15,
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

export default SignupScreen;
