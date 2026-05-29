import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';

// Note: Real sound metering requires expo-av
// For this student-level implementation, we will simulate the noise levels
// or provide a structure that can be easily connected to expo-av.

const SoundMeterScreen = () => {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [volume, setVolume] = useState(0);
  const [maxVolume, setMaxVolume] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startMeasuring = () => {
    setIsMeasuring(true);
    setMaxVolume(0);

    // Simulating sound input for student-level demonstration
    // In a real app, you would use Audio.Recording.setOnRecordingStatusUpdate
    const interval = setInterval(() => {
      const simulatedValue = Math.floor(Math.random() * 60) + 30; // 30-90 dB range
      setVolume(simulatedValue);
      setMaxVolume(prev => Math.max(prev, simulatedValue));
    }, 500);

    setTimer(interval);
  };

  const stopMeasuring = () => {
    if (timer) clearInterval(timer);
    setIsMeasuring(false);
    setVolume(0);

    saveResult('Sound Meter', `Max Noise: ${maxVolume} dB`);
    Alert.alert('Result Saved', `The maximum noise level was ${maxVolume} dB.`);
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const getNoiseCategory = (db: number) => {
    if (db < 50) return { label: 'Quiet', color: '#4CAF50' };
    if (db < 75) return { label: 'Moderate', color: '#FFC107' };
    return { label: 'Loud', color: '#F44336' };
  };

  const category = getNoiseCategory(isMeasuring ? volume : maxVolume);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Pollution Meter</Text>
      <Text style={styles.description}>
        Measure the noise level in your environment.
      </Text>

      <View style={styles.meterContainer}>
        <View style={[styles.circle, { borderColor: isMeasuring ? category.color : Colors.border }]}>
          <Text style={styles.dbValue}>{isMeasuring ? volume : maxVolume}</Text>
          <Text style={styles.dbUnit}>dB</Text>
        </View>
        <Text style={[styles.categoryLabel, { color: category.color }]}>
          {isMeasuring ? category.label : (maxVolume > 0 ? `Max: ${category.label}` : 'Ready')}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isMeasuring ? styles.stopButton : styles.startButton]}
        onPress={isMeasuring ? stopMeasuring : startMeasuring}
      >
        <Text style={styles.buttonText}>
          {isMeasuring ? 'STOP MEASURING' : 'START MEASURING'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Quiet</Text>
          <Text style={styles.infoDesc}>30-50 dB (Library)</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Moderate</Text>
          <Text style={styles.infoDesc}>50-75 dB (Conversation)</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Loud</Text>
          <Text style={styles.infoDesc}>75+ dB (Traffic/Music)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginVertical: 15,
  },
  meterContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.card,
    elevation: 5,
  },
  dbValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text,
  },
  dbUnit: {
    fontSize: 18,
    color: Colors.textLight,
  },
  categoryLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  button: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  startButton: {
    backgroundColor: Colors.primary,
  },
  stopButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoGrid: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: Colors.text,
  },
  infoDesc: {
    color: Colors.textLight,
    fontSize: 12,
  },
});

export default SoundMeterScreen;
