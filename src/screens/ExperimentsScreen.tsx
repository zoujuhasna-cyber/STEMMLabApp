import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import ExperimentCard from '../components/ExperimentCard';
import { Experiment } from '../types';

const allExperiments: Experiment[] = [
  {
    id: '1',
    title: 'Reaction Time',
    description: 'Measure your response speed to visual stimuli.',
    icon: 'timer-outline',
    route: 'ReactionTime',
    category: 'Physics',
  },
  {
    id: '2',
    title: 'Earthquake Sensor',
    description: 'Monitor vibrations and seismic activity using the accelerometer.',
    icon: 'pulse-outline',
    route: 'Earthquake',
    category: 'Earth Science',
  },
  {
    id: '4',
    title: 'Breathing Tracker',
    description: 'Track your breathing rhythm using motion sensors.',
    icon: 'heart-outline',
    route: 'BreathingTracker',
    category: 'Biology',
  },
  {
    id: '5',
    title: 'Optical Lab',
    description: 'Use the device LED for light and optics experiments.',
    icon: 'flash-outline',
    route: 'Flashlight',
    category: 'Optics',
  },
];

const ExperimentsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allExperiments}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ExperimentCard
            experiment={item}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.title}>All Labs</Text>
            <Text style={styles.subtitle}>Select a laboratory station to begin.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: Number(1),
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Number(20),
  },
  header: {
    marginBottom: Number(20),
  },
  title: {
    fontSize: Number(24),
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: Number(14),
    color: Colors.textLight,
    marginTop: Number(4),
  },
});

export default ExperimentsScreen;
