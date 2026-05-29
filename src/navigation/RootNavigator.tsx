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
        headerStyle: {
          backgroundColor: Colors.card,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: Colors.text,
        },
        headerTintColor: Colors.primary,
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
        options={{ title: 'Reaction Time Test' }}
      />
      <Stack.Screen
        name="Earthquake"
        component={EarthquakeScreen}
        options={{ title: 'Earthquake Sensor' }}
      />
      <Stack.Screen
        name="BreathingTracker"
        component={BreathingTrackerScreen}
        options={{ title: 'Breathing Tracker' }}
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
