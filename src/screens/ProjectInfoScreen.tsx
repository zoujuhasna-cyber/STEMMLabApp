import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

const ProjectInfoScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Technical Assessment Report</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Selected Advanced Feature (PoC)</Text>
        <Text style={styles.point}>• Feature: Intelligent Text Filtering (Data Integrity).</Text>
        <Text style={styles.point}>• Need: Ensures lab observations remain professional and valid.</Text>
        <Text style={styles.point}>• Implementation: Uses the 'bad-words' NPM package for real-time lexical analysis.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Software Architecture</Text>
        <Text style={styles.point}>• Frontend: React Native (Expo 56) with Fabric Renderer.</Text>
        <Text style={styles.point}>• Offline Storage: Relational Database (SQLite) for reliability.</Text>
        <Text style={styles.point}>• Cloud Backend: Firebase Firestore for real-time data sync.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Critical Analysis</Text>
        <Text style={styles.point}>• Feasibility: High. Pure JavaScript logic ensures cross-device stability.</Text>
        <Text style={styles.point}>• Performance: Negligible overhead (O(n) complexity for text scanning).</Text>
        <Text style={styles.point}>• Privacy: Data is processed locally before being synced to Firestore.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Reflection & Limitations</Text>
        <Text style={styles.point}>• Limitation: Native module availability in Expo Go SDK 56.</Text>
        <Text style={styles.point}>• Workaround: Implemented Sanitized Numeric Styling for Android stability.</Text>
        <Text style={styles.point}>• Future: Expand PoC to include multi-language translation support.</Text>
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
