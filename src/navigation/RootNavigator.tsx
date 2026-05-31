import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import TabNavigator from './TabNavigator';
import AuthScreen from '../screens/AuthScreen';
import ReactionTimeScreen from '../screens/ReactionTimeScreen';
import EarthquakeScreen from '../screens/EarthquakeScreen';
import BreathingTrackerScreen from '../screens/BreathingTrackerScreen';
import FlashlightScreen from '../screens/FlashlightScreen';
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
        headerTitleStyle: { color: Colors.text, fontSize: Number(18) },
        headerTintColor: Colors.primary,
        headerTitleAlign: 'center',
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ReactionTime" component={ReactionTimeScreen} options={{ title: 'Reaction Time' }} />
          <Stack.Screen name="Earthquake" component={EarthquakeScreen} options={{ title: 'Earthquake' }} />
          <Stack.Screen name="BreathingTracker" component={BreathingTrackerScreen} options={{ title: 'Breathing' }} />
          <Stack.Screen name="Flashlight" component={FlashlightScreen} options={{ title: 'Torch Lab' }} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'STEMM Lab Login' }} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
