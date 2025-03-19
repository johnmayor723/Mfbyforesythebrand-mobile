import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';

const LogoutScreen = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
                logout(); // Call the logout function from context
            } catch (error) {
                console.error('Error clearing user data:', error);
            }
        };

        handleLogout();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Logging out...</Text>
            <ActivityIndicator size="large" color="#FF7E00" />
        </View>
    );
};

export default LogoutScreen;