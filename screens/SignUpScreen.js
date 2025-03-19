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

  const handleSignup = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('https://api.foodliie.com/api/auth/register', { name, email, password });

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
      <Image source={require('../assets/App 1024x1024px.jpg')} style={styles.logo} />
      <Text style={styles.welcomeText}>Join Market Picks</Text>

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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 16 },
  logo: { width: 200, height: 200, marginBottom: 20 },
  welcomeText: { fontSize: 34, fontWeight: 'bold', color: '#2D7B30', marginBottom: 20 },
  input: {
    width: '100%', padding: 15, backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#2D7B30',
    borderRadius: 25, marginBottom: 20, color: '#2D7B30'
  },
  button: { backgroundColor: '#FF7E00', padding: 15, borderRadius: 25, width: '100%', alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  forgotPasswordText: { color: '#FF7E00', fontSize: 14, alignSelf: 'flex-end', marginBottom: 15 },
  signupText: { color: '#2D7B30', fontSize: 16 },
});

export default SignupScreen;