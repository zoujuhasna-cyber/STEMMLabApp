import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ReactionTimeScreen from '../screens/ReactionTimeScreen';
import EarthquakeScreen from '../screens/EarthquakeScreen';
import BreathingTrackerScreen from '../screens/BreathingTrackerScreen';
import SoundMeterScreen from '../screens/SoundMeterScreen';
import { Colors } from '../constants/Colors';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.card,
        },
        headerTitleStyle: {
          color: Colors.text,
          fontSize: Number(18),
        },
        headerTintColor: Colors.primary,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReactionTime"
        component={ReactionTimeScreen}
        options={{ title: 'Reaction Time' }}
      />
      <Stack.Screen
        name="Earthquake"
        component={EarthquakeScreen}
        options={{ title: 'Earthquake' }}
      />
      <Stack.Screen
        name="BreathingTracker"
        component={BreathingTrackerScreen}
        options={{ title: 'Breathing' }}
      />
      <Stack.Screen
        name="SoundMeter"
        component={SoundMeterScreen}
        options={{ title: 'Sound Meter' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
