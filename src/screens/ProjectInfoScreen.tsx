import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

const ProjectInfoScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Project Documentation</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Firebase Integration</Text>
        <Text style={styles.body}>
          Firebase was selected for this project to provide secure Authentication and real-time
          Cloud Synchronization. Cloud Firestore allows experiment results to be backed up and
          accessed across different devices.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Local Storage (SQLite)</Text>
        <Text style={styles.body}>
          A Relational Database (SQLite) was implemented to ensure "Reliable Data Storage" even without
          an internet connection. This allows users to conduct field experiments in remote locations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Parallel Programming</Text>
        <Text style={styles.body}>
          The app uses Background Fetch and Task Manager to simulate parallel processing.
          This background thread handles data synchronization without interrupting the main UI thread.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Reflection & Limitations</Text>
        <Text style={styles.body}>
          Development focused on hardware-software synergy. A primary limitation was the strict
          typing requirements of the experimental Expo v56 engine on Android. Future improvements
          would include more complex data visualization and real AdMob monetization.
        </Text>
      </View>

      <Text style={styles.footer}>Professional Technical Assessment - STEMM Lab</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.primary, marginBottom: 20 },
  section: { backgroundColor: Colors.card, padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EEE' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  body: { fontSize: 14, color: Colors.textLight, lineHeight: 20 },
  footer: { textAlign: 'center', marginTop: 20, color: Colors.textLight, fontSize: 12, fontStyle: 'italic' }
});

export default ProjectInfoScreen;
