import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import ExperimentCard from '../components/ExperimentCard';
import { Experiment } from '../types';

const featuredExperiments: Experiment[] = [
  { id: '1', title: 'Reaction Time', description: 'Test reflexes!', icon: 'timer-outline', route: 'ReactionTime', category: 'Physics' },
  { id: '2', title: 'Earthquake Sensor', description: 'Measure vibrations.', icon: 'pulse-outline', route: 'Earthquake', category: 'Earth Science' },
  { id: '3', title: 'Sound Meter', description: 'Measure noise.', icon: 'volume-high-outline', route: 'SoundMeter', category: 'Acoustics' },
  { id: '4', title: 'Breathing Tracker', description: 'Track rhythm.', icon: 'heart-outline', route: 'BreathingTracker', category: 'Biology' },
];

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome!</Text>
          <Text style={styles.subtitle}>Ready for an experiment?</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          {featuredExperiments.map((item) => (
            <ExperimentCard
              key={item.id}
              experiment={item}
              onPress={() => navigation.navigate(item.route)}
            />
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Scientific Tip</Text>
          <Text style={styles.infoText}>Always record data multiple times!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: Number(1),
    backgroundColor: Colors.background
  },
  scrollContent: {
    paddingTop: Number(20),
    paddingBottom: Number(20),
    paddingLeft: Number(20),
    paddingRight: Number(20)
  },
  header: {
    marginBottom: Number(20),
    marginTop: Number(10)
  },
  greeting: {
    fontSize: Number(28),
    fontWeight: '700',
    color: Colors.text
  },
  subtitle: {
    fontSize: Number(16),
    color: Colors.textLight
  },
  section: {
    marginBottom: Number(20)
  },
  sectionTitle: {
    fontSize: Number(20),
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Number(15)
  },
  infoCard: {
    backgroundColor: Colors.primary,
    borderRadius: Number(15),
    paddingTop: Number(20),
    paddingBottom: Number(20),
    paddingLeft: Number(20),
    paddingRight: Number(20),
    marginBottom: Number(30)
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: Number(18),
    fontWeight: '700',
    marginBottom: Number(8)
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: Number(14)
  },
});

export default HomeScreen;
