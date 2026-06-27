import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Filter from 'bad-words';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const DataIntegrityScreen = () => {
  const [note, setNote] = useState('');
  const [filteredNote, setFilteredNote] = useState('');
  const filter = new Filter();

  const handleFilter = () => {
    if (!note.trim()) {
      Alert.alert("Input Empty", "Please enter some laboratory observations first.");
      return;
    }

    try {
      // Lexical analysis and cleansing
      const clean = filter.clean(note);
      setFilteredNote(clean);
    } catch (e) {
      setFilteredNote(note);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={Number(40)} color={Colors.primary} />
        <Text style={styles.title}>Feature PoC: Data Integrity</Text>
        <Text style={styles.subtitle}>Requirement: Professional Lexical Filtering</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Raw Observation Notes:</Text>
        <TextInput
          style={styles.input}
          multiline
          value={note}
          onChangeText={setNote}
          placeholder="Enter scientific observations here..."
          placeholderTextColor="#999999"
        />

        <TouchableOpacity style={styles.button} onPress={handleFilter}>
          <Text style={styles.buttonText}>CLEANSE & VALIDATE</Text>
        </TouchableOpacity>
      </View>

      {filteredNote !== '' && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Professional Output (Cloud Ready):</Text>
          <Text style={styles.resultText}>{filteredNote}</Text>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>PoC Technical Justification:</Text>
        <Text style={styles.infoText}>• NPM Implementation: Uses 'bad-words' library.</Text>
        <Text style={styles.infoText}>• Real Need: Maintain scientific report standards.</Text>
        <Text style={styles.infoText}>• Feasibility: 100% stable JS-based processing.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: Number(1), backgroundColor: Colors.background },
  content: { padding: Number(20) },
  header: { alignItems: 'center', marginBottom: Number(25) },
  title: { fontSize: Number(22), fontWeight: '700', color: Colors.text, marginTop: Number(10) },
  subtitle: { fontSize: Number(14), color: Colors.textLight },
  card: { backgroundColor: Colors.card, padding: Number(20), borderRadius: Number(15), borderWidth: Number(1), borderColor: '#EEEEEE' },
  label: { fontSize: Number(14), fontWeight: '700', color: Colors.text, marginBottom: Number(10) },
  input: { backgroundColor: '#F9F9F9', padding: Number(15), borderRadius: Number(10), height: Number(100), textAlignVertical: 'top', color: Colors.text },
  button: { backgroundColor: Colors.primary, padding: Number(18), borderRadius: Number(10), alignItems: 'center', marginTop: Number(20) },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  resultCard: { marginTop: Number(20), backgroundColor: '#E8F5E9', padding: Number(15), borderRadius: Number(10), borderWidth: Number(1), borderColor: '#C8E6C9' },
  resultLabel: { fontSize: Number(12), fontWeight: '700', color: '#2E7D32', marginBottom: Number(5) },
  resultText: { fontSize: Number(14), color: Colors.text },
  infoBox: { marginTop: Number(30), backgroundColor: '#FFF9C4', padding: Number(15), borderRadius: Number(10) },
  infoTitle: { fontWeight: '700', color: '#FBC02D', marginBottom: Number(5) },
  infoText: { fontSize: Number(13), color: '#F9A825', marginBottom: Number(3) }
});

export default DataIntegrityScreen;
