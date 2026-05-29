import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { initDatabase } from './src/database/dbService';
import { registerBackgroundSync } from './src/services/backgroundTask';

export default function App() {
  useEffect(() => {
    // Initialize SQLite Database
    initDatabase();

    // Register Background Fetch (Requirement: Parallel Programming/Work Manager)
    registerBackgroundSync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: Number(1) }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
