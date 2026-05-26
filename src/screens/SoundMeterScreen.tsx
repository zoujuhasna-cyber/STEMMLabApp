import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';

// We try to import Audio safely
let Audio: any;
try {
  Audio = require('expo-av').Audio;
} catch (e) {
  Audio = null;
}

const SoundMeterScreen = () => {
  const [recording, setRecording] = useState<any>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [volume, setVolume] = useState(Number(0));
  const [maxVolume, setMaxVolume] = useState(Number(0));

  const isSupported = !!Audio;

  async function startMeasuring() {
    if (!isSupported) {
      Alert.alert('Not Supported', 'The Sound Meter requires a native module that is not available.');
      return;
    }

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Denied', 'Microphone access is required.');
        return;
      }

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        {
            android: {
                extension: '.m4a',
                outputFormat: Number(2),
                audioEncoder: Number(3),
                sampleRate: Number(44100),
                numberOfChannels: Number(2),
                bitRate: Number(128000),
            },
            ios: {
                extension: '.m4a',
                audioQuality: Number(127),
                sampleRate: Number(44100),
                numberOfChannels: Number(2),
                bitRate: Number(128000),
                linearPCMBitDepth: Number(16),
                linearPCMIsBigEndian: false,
                linearPCMIsFloat: false,
            },
            web: {}
        },
        (status: any) => {
          if (status && status.metering !== undefined) {
            const db = Math.floor(Math.max(Number(0), Number(status.metering) + 160) / 1.6);
            setVolume(Number(db));
            setMaxVolume((prev: number) => Math.max(Number(prev), Number(db)));
          }
        },
        Number(100)
      );

      setRecording(newRecording);
      setIsMeasuring(true);
      setMaxVolume(Number(0));
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not start measurement.');
    }
  }

  async function stopMeasuring() {
    if (!recording) return;
    setIsMeasuring(false);
    try {
      await recording.stopAndUnloadAsync();
      setRecording(null);
      saveResult('Sound Meter', `Max: ${maxVolume} dB`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Pollution Meter</Text>

      {!isSupported && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ Native Module Missing</Text>
        </View>
      )}

      <View style={styles.meterContainer}>
        <View style={[styles.circle, { borderColor: isMeasuring ? '#F44336' : Colors.border }]}>
          <Text style={styles.dbValue}>{Number(isMeasuring ? volume : maxVolume)}</Text>
          <Text style={styles.dbUnit}>dB</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isMeasuring ? styles.stopButton : styles.startButton]}
        onPress={isMeasuring ? stopMeasuring : startMeasuring}
        disabled={!isSupported}
      >
        <Text style={styles.buttonText}>
          {isMeasuring ? 'STOP' : 'START'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: Number(1),
    backgroundColor: Colors.background,
    padding: Number(20),
    alignItems: 'center'
  },
  title: {
    fontSize: Number(22),
    fontWeight: '700',
    color: Colors.text,
    marginTop: Number(10)
  },
  warningBox: {
    backgroundColor: '#FFEBEE',
    padding: Number(10),
    borderRadius: Number(8),
    marginTop: Number(10),
    width: '100%'
  },
  warningText: {
    color: '#C62828',
    fontWeight: '700',
    textAlign: 'center'
  },
  meterContainer: {
    alignItems: 'center',
    marginVertical: Number(40)
  },
  circle: {
    width: Number(180),
    height: Number(180),
    borderRadius: Number(90),
    borderWidth: Number(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.card,
    // REMOVED elevation
  },
  dbValue: {
    fontSize: Number(48),
    fontWeight: '700',
    color: Colors.text
  },
  dbUnit: {
    fontSize: Number(18),
    color: Colors.textLight
  },
  button: {
    width: '100%',
    padding: Number(18),
    borderRadius: Number(12),
    alignItems: 'center',
    marginVertical: Number(20)
  },
  startButton: {
    backgroundColor: Colors.primary
  },
  stopButton: {
    backgroundColor: Colors.error
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: Number(18),
    fontWeight: '700'
  },
});

export default SoundMeterScreen;
