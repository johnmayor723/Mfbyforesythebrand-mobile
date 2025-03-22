import React, { useState } from 'react';
import {  
  Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator  
} from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const endpoint = 'http://93.127.160.233:3060/api/auth/login';
  const handleSignup = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://http://93.127.160.233:3060/api/auth/register', { name, email, password });

      setIsLoading(false);
      Alert.alert(
        'Registration Successful!',
        'Your account has been created. Please check your email to verify your account before logging in.',
        [{ text: 'OK', onPress: () => navigation.replace('Auth') }]
      );
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/mfbyforesythebrandcom.jpeg')} style={styles.logo} />
      <Text style={styles.welcomeText}>Join mfbyforesythebrandcom</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

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
    backgroundColor: '#FFFFFF', // White background
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
    color: '#9B0D54', // Reddish-purple text
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#9B0D54', // Reddish-purple border
    borderRadius: 25, // Rounded corners
    marginBottom: 20,
    color: '#000', // Black text for clear contrast
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
    borderColor: '#9B0D54', // Reddish-purple border
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Subtle shadow effect on Android
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10, // Space between icon and text
  },
  googleButtonText: {
    color: '#9B0D54', // Reddish-purple text
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#9B0D54', // Reddish-purple button
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
    color: '#9B0D54', // Reddish-purple text
    fontSize: 16,
  },
});
export default SignupScreen;