import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const PhoneAuthScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Phone number must be exactly 10 digits.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://api.foodliie.com/api/auth/send-otp', {
        name,
        phone: `+234${phoneNumber}`,
      });

      Alert.alert('OTP Sent', 'Check your phone for the OTP.');
      setIsLoading(false);
      navigation.navigate('SendOtp', { phoneNumber: `+234${phoneNumber}` });
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/App 1024x1024px.jpg')} style={styles.logo} />
      <Text style={styles.welcomeText}>Phone Number Authentication</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      {/* Phone Number Input */}
      <View style={styles.phoneInputContainer}>
        <Text style={styles.countryCode}>+234</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="906907645"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Send OTP</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 16 },
  logo: { width: 200, height: 200, marginBottom: 20 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#2D7B30', marginBottom: 20 },
  input: { width: '100%', padding: 15, backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#2D7B30', borderRadius: 25, marginBottom: 20, color: '#2D7B30' },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#2D7B30', borderRadius: 25, backgroundColor: '#F0F0F0', marginBottom: 20 },
  countryCode: { fontSize: 16, fontWeight: 'bold', paddingHorizontal: 15, color: '#2D7B30' },
  phoneInput: { flex: 1, padding: 15, color: '#2D7B30' },
  button: { backgroundColor: '#FF7E00', padding: 15, borderRadius: 25, width: '100%', alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});

export default PhoneAuthScreen;
