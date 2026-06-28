import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import ExperimentCard from '../components/ExperimentCard';
import { Experiment } from '../types';

const prototypeLabs: Experiment[] = [
  {
    id: '6',
    title: 'Data Integrity Lab',
    description: 'Advanced Lexical Filtering Prototype. Ensures scientific observations remain professional before cloud synchronization.',
    icon: 'shield-checkmark-outline',
    route: 'PoC',
    category: 'Advanced PoC'
  },
];

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Prototype Dashboard</Text>
          <Text style={styles.subtitle}>Proof of Concept: Data Integrity System</Text>
        </View>

        <View style={styles.section}>
          {prototypeLabs.map((item) => (
            <ExperimentCard
              key={item.id}
              experiment={item}
              onPress={() => navigation.navigate(item.route)}
            />
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Prototype Note:</Text>
          <Text style={styles.infoText}>
            This module demonstrates real-time text cleansing. It validates laboratory notes
            locally on the device to maintain professional integrity standards.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: Number(1), backgroundColor: Colors.background },
  scrollContent: { padding: Number(20) },
  header: { marginBottom: Number(30), marginTop: Number(10) },
  greeting: { fontSize: Number(26), fontWeight: '700', color: Colors.primary },
  subtitle: { fontSize: Number(14), color: Colors.textLight, marginTop: Number(5) },
  section: { marginBottom: Number(20) },
  infoBox: {
    marginTop: Number(20),
    padding: Number(15),
    backgroundColor: '#E3F2FD',
    borderRadius: Number(12),
    borderWidth: Number(1),
    borderColor: '#BBDEFB'
  },
  infoTitle: { fontSize: Number(14), fontWeight: '700', color: '#1565C0', marginBottom: Number(5) },
  infoText: { fontSize: Number(13), color: '#1E88E5', lineHeight: Number(18) }
});

export default HomeScreen;
