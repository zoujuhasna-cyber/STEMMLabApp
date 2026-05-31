import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import ExperimentCard from '../components/ExperimentCard';
import { Experiment } from '../types';

const featuredExperiments: Experiment[] = [
  { id: '1', title: 'Reaction Time', description: 'Test reflexes!', icon: 'timer-outline', route: 'ReactionTime', category: 'Physics' },
  { id: '2', title: 'Earthquake Sensor', description: 'Measure vibrations.', icon: 'pulse-outline', route: 'Earthquake', category: 'Earth Science' },
  { id: '4', title: 'Breathing Tracker', description: 'Track rhythm.', icon: 'heart-outline', route: 'BreathingTracker', category: 'Biology' },
  { id: '5', title: 'Optical Lab', description: 'Hardware LED control for light tests.', icon: 'flash-outline', route: 'Flashlight', category: 'Optics' },
];

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome Scientist!</Text>
          <Text style={styles.subtitle}>Ready for an experiment?</Text>
        </View>

        <View style={styles.section}>
          {featuredExperiments.map((item) => (
            <ExperimentCard
              key={item.id}
              experiment={item}
              onPress={() => navigation.navigate(item.route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: Number(1), backgroundColor: Colors.background },
  scrollContent: { padding: Number(20) },
  header: { marginBottom: Number(20), marginTop: Number(10) },
  greeting: { fontSize: Number(28), fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: Number(16), color: Colors.textLight },
  section: { marginBottom: Number(20) },
});

export default HomeScreen;
