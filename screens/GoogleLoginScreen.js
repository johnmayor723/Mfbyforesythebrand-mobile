import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOOGLE_CLIENT_ID = "328728614931-3ksi7t8cv8pt1t0d1us8d9opeg6rsnvr.apps.googleusercontent.com";
const REDIRECT_URI = "https://marketspick.com/auth/google/callback";
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

const GOOGLE_CLIENT_SECRET = "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"

const GoogleLoginScreen = ({ navigation }) => {
  const handleGoogleResponse = async (event) => {
    const { url } = event;
    if (url.startsWith(REDIRECT_URI)) {
      const code = new URLSearchParams(url.split('?')[1]).get('code');

      if (code) {
        try {
          // Exchange code for access token
          const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
          });

          const { access_token } = tokenResponse.data;

          // Fetch user profile from Google
          const userResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          const googleUser = userResponse.data;

          // Send user data to backend for authentication
          const apiResponse = await axios.post("https://api.foodliie.com/api/auth/google", {
            email: googleUser.email,
            name: googleUser.name,
            googleId: googleUser.id,
          });

          const { user, token } = apiResponse.data;

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));

          Alert.alert('Google Login Successful!', `Welcome ${user.name}`);
          navigation.replace('Home'); // Redirect to home screen after login
        } catch (error) {
          Alert.alert('Google Login Failed', 'Something went wrong');
          navigation.goBack();
        }
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: GOOGLE_AUTH_URL }} onNavigationStateChange={handleGoogleResponse} />
    </View>
  );
};

export default GoogleLoginScreen;
