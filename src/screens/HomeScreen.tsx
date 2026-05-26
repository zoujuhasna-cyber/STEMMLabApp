import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import ExperimentCard from '../components/ExperimentCard';
import { Experiment } from '../types';

const featuredExperiments: Experiment[] = [
  {
    id: '1',
    title: 'Reaction Time',
    description: 'Test your reflexes! How fast can you tap?',
    icon: 'timer-outline',
    route: 'ReactionTime',
    category: 'Physics',
  },
  {
    id: '2',
    title: 'Earthquake Sensor',
    description: 'Measure vibrations using the accelerometer.',
    icon: 'pulse-outline',
    route: 'Earthquake',
    category: 'Earth Science',
  },
  {
    id: '3',
    title: 'Sound Meter',
    description: 'Measure ambient noise levels in decibels.',
    icon: 'volume-high-outline',
    route: 'SoundMeter',
    category: 'Acoustics',
  },
  {
    id: '4',
    title: 'Breathing Tracker',
    description: 'Track your breathing rhythm using motion sensors.',
    icon: 'heart-outline',
    route: 'BreathingTracker',
    category: 'Biology',
  },
];

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, Scientist!</Text>
          <Text style={styles.subtitle}>Ready for today's experiment?</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Experiments</Text>
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
          <Text style={styles.infoText}>
            Always record your data multiple times to get the most accurate results!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 25,
    marginTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  infoTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
});

export default HomeScreen;
