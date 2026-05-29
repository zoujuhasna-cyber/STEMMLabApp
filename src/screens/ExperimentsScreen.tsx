import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
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

const ExperimentsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allExperiments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExperimentCard
            experiment={item}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.title}>All Experiments</Text>
            <Text style={styles.subtitle}>Select a lab to begin your exploration</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
});

export default ExperimentsScreen;
