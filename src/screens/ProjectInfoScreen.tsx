import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

const ProjectInfoScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Project Summary</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Technologies</Text>
        <Text style={styles.point}>• Firebase: Secure Auth and Cloud Sync.</Text>
        <Text style={styles.point}>• SQLite: Reliable local data storage.</Text>
        <Text style={styles.point}>• Expo Sensors: Real-time hardware access.</Text>
        <Text style={styles.point}>• Google Maps: Live GPS tracking.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lab Modules</Text>
        <Text style={styles.point}>• Reaction Time: Measures reflex speed.</Text>
        <Text style={styles.point}>• Seismograph: Monitors vibrations.</Text>
        <Text style={styles.point}>• Breathing: Tracks respiratory rhythm.</Text>
        <Text style={styles.point}>• Optical Lab: Controls hardware torch.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Features</Text>
        <Text style={styles.point}>• Parallelism: Background data syncing.</Text>
        <Text style={styles.point}>• Data Export: CSV sharing via native sheet.</Text>
        <Text style={styles.point}>• Notifications: Instant user feedback.</Text>
        <Text style={styles.point}>• Battery Level: Real-time device monitoring.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reflection & Limitations</Text>
        <Text style={styles.point}>• Built on experimental Expo SDK 56.</Text>
        <Text style={styles.point}>• Used strict numeric styles for stability.</Text>
        <Text style={styles.point}>• Offline-first design for field research.</Text>
        <Text style={styles.point}>• Scalable cloud architecture via Firestore.</Text>
      </View>

      <Text style={styles.footer}>Professional Technical Assessment - STEMM Lab</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.primary, marginBottom: 20 },
  section: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE'
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 10 },
  point: { fontSize: 14, color: Colors.textLight, marginBottom: 5, lineHeight: 20 },
  footer: { textAlign: 'center', marginTop: 20, color: Colors.textLight, fontSize: 12, fontStyle: 'italic' }
});

export default ProjectInfoScreen;
