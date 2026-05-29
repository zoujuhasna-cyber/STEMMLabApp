import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';

const BreathingTrackerScreen = () => {
  const [data, setData] = useState<number[]>(new Array(Number(20)).fill(Number(0)));
  const [subscription, setSubscription] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(Number(200));
    setSubscription(
      Accelerometer.addListener(accelData => {
        const rawZ = Number(accelData.z);
        const zValue = Number.isFinite(rawZ) ? rawZ : Number(0);

        setData(prevData => {
          const newData = [...prevData, zValue];
          return newData.slice(Number(-20));
        });
      })
    );
  };

  const _unsubscribe = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const toggleTracking = () => {
    if (isTracking) {
      _unsubscribe();
      const duration = startTime ? Math.floor((Date.now() - startTime) / Number(1000)) : Number(0);
      saveResult('Breathing Tracker', `${duration}s duration`);
    } else {
      setStartTime(Date.now());
      setData(new Array(Number(20)).fill(Number(0)));
      _subscribe();
    }
    setIsTracking(!isTracking);
  };

  useEffect(() => {
    return () => _unsubscribe();
  }, [subscription]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Pace Tracker</Text>

      {/* TEMPORARY: Chart removed to isolate "String to Double" error */}
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>Motion Tracking Active</Text>
        <Text style={styles.liveValue}>
            {Number(data[data.length - 1]).toFixed(3)}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isTracking ? styles.stopButton : styles.startButton]}
        onPress={toggleTracking}
      >
        <Text style={styles.buttonText}>
          {isTracking ? 'STOP TRACKING' : 'START TRACKING'}
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
  placeholderBox: {
    width: '100%',
    height: Number(200),
    backgroundColor: '#F0F4F8',
    borderRadius: Number(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Number(20),
    borderWidth: Number(1),
    borderColor: '#D1D9E6'
  },
  placeholderText: {
    color: Colors.textLight,
    fontSize: Number(16)
  },
  liveValue: {
    fontSize: Number(32),
    fontWeight: '700',
    color: Colors.primary,
    marginTop: Number(10)
  },
  button: {
    width: '100%',
    padding: Number(18),
    borderRadius: Number(12),
    alignItems: 'center',
    marginVertical: Number(10)
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

export default BreathingTrackerScreen;
