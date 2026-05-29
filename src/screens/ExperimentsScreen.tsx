import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import ExperimentCard from '../components/ExperimentCard';
import { Experiment } from '../types';

const allExperiments: Experiment[] = [
  {
    id: '1',
    title: 'Reaction Time',
    description: 'Measure your response speed.',
    icon: 'timer-outline',
    route: 'ReactionTime',
    category: 'Physics',
  },
  {
    id: '2',
    title: 'Earthquake Sensor',
    description: 'Monitor vibrations.',
    icon: 'pulse-outline',
    route: 'Earthquake',
    category: 'Earth Science',
  },
  {
    id: '3',
    title: 'Sound Meter',
    description: 'Measure ambient noise levels.',
    icon: 'volume-high-outline',
    route: 'SoundMeter',
    category: 'Acoustics',
  },
  {
    id: '4',
    title: 'Breathing Tracker',
    description: 'Track your breathing rhythm.',
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
            <Text style={styles.title}>All Experiments</Text>
            <Text style={styles.subtitle}>Select a lab to begin</Text>
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
    fontWeight: '700', // Changed from 'bold'
    color: Colors.text,
  },
  subtitle: {
    fontSize: Number(14),
    color: Colors.textLight,
    marginTop: Number(4),
  },
});

export default ExperimentsScreen;
