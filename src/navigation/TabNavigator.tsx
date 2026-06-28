import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
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
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Scientist' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
