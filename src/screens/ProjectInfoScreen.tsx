import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

const ProjectInfoScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Project Implementation Report</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Advanced Feature Prototype (PoC)</Text>
        <Text style={styles.point}>• Feature: Intelligent Data Integrity Filter.</Text>
        <Text style={styles.point}>• Implementation: Uses the 'bad-words' NPM package.</Text>
        <Text style={styles.point}>• Need: Ensures scientific observations are professional before cloud sync.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Database & Firebase Integration</Text>
        <Text style={styles.point}>• SQLite: Relational DB for reliable offline storage.</Text>
        <Text style={styles.point}>• Firestore: Real-time cloud synchronization engine.</Text>
        <Text style={styles.point}>• Auth: Secure scientist login gate using Firebase.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Device Capabilities & Sensors</Text>
        <Text style={styles.point}>• Sensors: Accelerometer (Seismograph/Breathing) and Microphone.</Text>
        <Text style={styles.point}>• GPS: Native Google Maps integration for field coordinates.</Text>
        <Text style={styles.point}>• Logic: Background Task Manager for parallel processing.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Reflection & Critical Analysis</Text>
        <Text style={styles.point}>• Feasibility: High. Implemented sanitized styling for SDK 56 stability.</Text>
        <Text style={styles.point}>• Limitation: Native module sync in experimental dev environments.</Text>
        <Text style={styles.point}>• Solution: Implemented hardware fallbacks and strict numeric typing.</Text>
      </View>

      <Text style={styles.footer}>Lead Scientist Technical Summary - STEMM Lab</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.primary, marginBottom: 20 },
  section: { backgroundColor: Colors.card, padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EEEEEE' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 10 },
  point: { fontSize: 14, color: Colors.textLight, marginBottom: 5, lineHeight: 20 },
  footer: { textAlign: 'center', marginTop: 20, color: Colors.textLight, fontSize: 12, fontStyle: 'italic' }
});

export default ProjectInfoScreen;
