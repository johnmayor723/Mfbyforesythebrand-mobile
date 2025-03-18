import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SendOtpScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'OTP must be 6 digits.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://api.foodliie.com/api/auth/confirm-otp', { phone: phoneNumber, otp });

      const { user, token } = response.data;

      // Save user and token
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Login Successful', `Welcome ${user.name}`);
      setIsLoading(false);
      navigation.replace('HomeScreen');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/App 1024x1024px.jpg')} style={styles.logo} />
      <Text style={styles.welcomeText}>Enter OTP</Text>
      <Text style={styles.infoText}>OTP sent to {phoneNumber}</Text>

      {/* OTP Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#999"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      {/* Verify Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 16 },
  logo: { width: 200, height: 200, marginBottom: 20 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#2D7B30', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#666', marginBottom: 20 },
  input: { width: '100%', padding: 15, backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#2D7B30', borderRadius: 25, marginBottom: 20, textAlign: 'center', fontSize: 18, color: '#2D7B30' },
  button: { backgroundColor: '#FF7E00', padding: 15, borderRadius: 25, width: '100%', alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});

export default SendOtpScreen;
