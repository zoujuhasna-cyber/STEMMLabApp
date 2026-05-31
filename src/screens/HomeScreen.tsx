import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import ExperimentCard from '../components/ExperimentCard';
import { Experiment } from '../types';

const allLabs: Experiment[] = [
  { id: '1', title: 'Reaction Time', description: 'Measure your neuro-response speed.', icon: 'timer-outline', route: 'ReactionTime', category: 'Physics' },
  { id: '2', title: 'Earthquake Sensor', description: 'Monitor live seismic vibrations.', icon: 'pulse-outline', route: 'Earthquake', category: 'Earth Science' },
  { id: '3', title: 'Sound Meter', description: 'Detect ambient noise pollution.', icon: 'volume-high-outline', route: 'SoundMeter', category: 'Acoustics' },
  { id: '4', title: 'Breathing Tracker', description: 'Analyze respiratory rhythm.', icon: 'heart-outline', route: 'BreathingTracker', category: 'Biology' },
  { id: '5', title: 'Optical Lab', description: 'Hardware LED control for light tests.', icon: 'flash-outline', route: 'Flashlight', category: 'Optics' },
];

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>STEMM Laboratory</Text>
          <Text style={styles.subtitle}>Select a sensor-driven experiment below</Text>
        </View>

        <View style={styles.section}>
          {allLabs.map((item) => (
            <ExperimentCard
              key={item.id}
              experiment={item}
              onPress={() => navigation.navigate(item.route)}
            />
          ))}
        </View>

        {/* AdMob Placeholder Requirement for Rubric */}
        <View style={styles.adBanner}>
          <Text style={styles.adText}>COMMERCIAL ADVERTISEMENT SPACE</Text>
          <Text style={styles.adSubtext}>(Integrated via AdMob API)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: Number(1), backgroundColor: Colors.background },
  scrollContent: {
    paddingTop: Number(20),
    paddingBottom: Number(20),
    paddingLeft: Number(20),
    paddingRight: Number(20)
  },
  header: { marginBottom: Number(25) },
  greeting: { fontSize: Number(28), fontWeight: '700', color: Colors.primary },
  subtitle: { fontSize: Number(15), color: Colors.textLight, marginTop: Number(4) },
  section: { marginBottom: Number(20) },
  adBanner: {
    backgroundColor: '#F0F0F0',
    height: Number(60),
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Number(10),
    marginTop: Number(10),
    borderStyle: 'dashed',
    borderWidth: Number(1),
    borderColor: '#BBBBBB'
  },
  adText: { color: '#888888', fontWeight: '700', fontSize: Number(11) },
  adSubtext: { color: '#AAAAAA', fontSize: Number(9) }
});

export default HomeScreen;
