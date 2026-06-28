import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import TabNavigator from './TabNavigator';
import AuthScreen from '../screens/AuthScreen';
import DataIntegrityScreen from '../screens/DataIntegrityScreen';
import { Colors } from '../constants/Colors';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.card },
        headerTitleStyle: { color: Colors.text, fontSize: 18 },
        headerTintColor: Colors.primary,
        headerTitleAlign: 'center',
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="PoC" component={DataIntegrityScreen} options={{ title: 'Data Integrity Lab' }} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Laboratory Login' }} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
