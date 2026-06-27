import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import ProjectInfoScreen from '../screens/ProjectInfoScreen';
import DataIntegrityScreen from '../screens/DataIntegrityScreen';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Home') {
            iconName = focused ? 'flask' : 'flask-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Report') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'PoC') {
            iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
          }
          return <Ionicons name={iconName} size={Number(size)} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerStyle: { backgroundColor: Colors.card },
        headerTitleStyle: { color: Colors.text, fontSize: Number(18) },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Laboratory' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Logbook' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Field Map' }} />
      <Tab.Screen name="PoC" component={DataIntegrityScreen} options={{ title: 'Integrity PoC' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Scientist' }} />
      <Tab.Screen name="Report" component={ProjectInfoScreen} options={{ title: 'Report' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
