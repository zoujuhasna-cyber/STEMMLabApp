import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

        {/* AdMob Placeholder Requirement */}
        <View style={styles.adBanner}>
          <Text style={styles.adText}>ADVERTISEMENT BANNER</Text>
          <Text style={styles.adSubtext}>(AdMob Integration Ready)</Text>
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
  adBanner: {
    backgroundColor: '#E0E0E0',
    height: Number(60),
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Number(8),
    marginTop: Number(10),
    borderStyle: 'dashed',
    borderWidth: Number(1),
    borderColor: '#999999'
  },
  adText: { color: '#666666', fontWeight: '700', fontSize: Number(12) },
  adSubtext: { color: '#999999', fontSize: Number(10) }
});

export default HomeScreen;
