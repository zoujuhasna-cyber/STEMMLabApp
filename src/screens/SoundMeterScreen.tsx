import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';

// Safely import Audio for Android
let Audio: any = null;
try {
  Audio = require('expo-av').Audio;
} catch (e) {
  console.log('Audio module not found');
}

const SoundMeterScreen = () => {
  const [recording, setRecording] = useState<any>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [volume, setVolume] = useState(Number(0));
  const [maxVolume, setMaxVolume] = useState(Number(0));

  const isSensorAvailable = !!Audio;

  async function startMeasuring() {
    if (!isSensorAvailable) {
      Alert.alert('Sensor Missing', 'Android Microphone module not ready.');
      return;
    }

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Denied', 'Android Microphone access required.');
        return;
      }

      // Android-only configuration
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false, // Explicitly disabled for focus
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        {
          android: {
            extension: '.m4a',
            outputFormat: 2,
            audioEncoder: 3,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {}, // Removed iOS settings
          web: {}
        },
        (status: any) => {
          if (status.metering !== undefined) {
            const db = Math.floor(Math.max(0, status.metering + 160) / 1.6);
            setVolume(Number(db));
            setMaxVolume((prev) => Math.max(Number(prev), Number(db)));
          }
        },
        100
      );

      setRecording(newRecording);
      setIsMeasuring(true);
      setMaxVolume(Number(0));
    } catch (err) {
      console.error(err);
      Alert.alert('Android Error', 'Could not start the sound sensor.');
    }
  }

  async function stopMeasuring() {
    if (!recording) return;
    setIsMeasuring(false);
    try {
      await recording.stopAndUnloadAsync();
      setRecording(null);
      saveResult('Sound Meter', `${maxVolume} dB`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Android Acoustic Lab</Text>

      {!isSensorAvailable && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ Android Hardware Sync Required</Text>
        </View>
      )}

      <View style={styles.meterContainer}>
        <View style={[styles.circle, { borderColor: isMeasuring ? Colors.error : Colors.border }]}>
          <Text style={styles.dbValue}>{Number(isMeasuring ? volume : maxVolume)}</Text>
          <Text style={styles.dbUnit}>dB</Text>
        </View>
        <Text style={styles.statusText}>{isMeasuring ? 'SAMPLING...' : 'READY'}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isMeasuring ? styles.stopButton : styles.startButton, !isSensorAvailable && { opacity: 0.5 }]}
        onPress={isMeasuring ? stopMeasuring : startMeasuring}
        disabled={!isSensorAvailable}
      >
        <Text style={styles.buttonText}>{isMeasuring ? 'STOP' : 'START'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: Colors.text, marginTop: 10 },
  warningBox: { backgroundColor: '#FFEBEE', padding: 10, borderRadius: 8, marginTop: 10, width: '100%' },
  warningText: { color: '#C62828', fontWeight: '700', textAlign: 'center' },
  meterContainer: { alignItems: 'center', marginVertical: 40 },
  circle: { width: 180, height: 180, borderRadius: 90, borderWidth: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.card },
  dbValue: { fontSize: 48, fontWeight: '700', color: Colors.text },
  dbUnit: { fontSize: 18, color: Colors.textLight },
  statusText: { marginTop: 15, fontWeight: '700', color: Colors.primary },
  button: { alignSelf: 'stretch', padding: 18, borderRadius: 12, alignItems: 'center', marginVertical: 20 },
  startButton: { backgroundColor: Colors.primary },
  stopButton: { backgroundColor: Colors.error },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});

export default SoundMeterScreen;
