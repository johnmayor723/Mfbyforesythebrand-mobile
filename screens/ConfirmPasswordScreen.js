import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ActivityIndicator, Alert 
} from 'react-native';
import axios from 'axios';

const ConfirmPasswordScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmPassword = async () => {
    if (!otp || !newPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = 'https://api.foodliie.com/api/auth/mobile-reset-password';
      const payload = { otp, newPassword };

      await axios.post(endpoint, payload);

      Alert.alert('Success', 'Password reset successful! You can now log in.');
      navigation.navigate('Auth'); // Navigate back to login
    } catch (error) {
      console.error(error);
      Alert.alert('Reset Failed', error.response?.data?.error || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Confirm Password Reset</Text>

      {/* OTP Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      {/* New Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button} onPress={handleConfirmPassword} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Confirm Reset</Text>}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color:
