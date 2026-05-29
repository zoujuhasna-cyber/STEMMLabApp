import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';

const EarthquakeScreen = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<any>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [maxVibration, setMaxVibration] = useState(0);

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(100);
    setSubscription(
      Accelerometer.addListener(accelData => {
        const x = Number(accelData.x) || 0;
        const y = Number(accelData.y) || 0;
        const z = Number(accelData.z) || 0;
        setData({ x, y, z });

        const rawIntensity = Math.sqrt(x ** 2 + y ** 2 + z ** 2) - 1;
        const absoluteIntensity = Math.abs(rawIntensity);

        if (absoluteIntensity > maxVibration) {
          setMaxVibration(absoluteIntensity);
        }
      })
    );
  };

  const _unsubscribe = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const toggleMeasuring = () => {
    if (isMeasuring) {
      _unsubscribe();
      saveResult('Earthquake Sensor', `Max: ${maxVibration.toFixed(2)} g`);
    } else {
      setMaxVibration(0);
      _subscribe();
    }
    setIsMeasuring(!isMeasuring);
  };

  useEffect(() => {
    return () => _unsubscribe();
  }, [subscription]);

  const currentVibration = Math.abs(Math.sqrt(data.x**2 + data.y**2 + data.z**2) - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earthquake Sensor</Text>

      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>Vibration Monitor Active</Text>
        <Text style={styles.liveValue}>{currentVibration.toFixed(3)} g</Text>
      </View>

      <View style={styles.sensorContainer}>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Current</Text>
          <Text style={styles.valueText}>{currentVibration.toFixed(2)}</Text>
          <Text style={styles.unitText}>g-force</Text>
        </View>

        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Max</Text>
          <Text style={[styles.valueText, { color: Colors.error }]}>
            {maxVibration.toFixed(2)}
          </Text>
          <Text style={styles.unitText}>g-force</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isMeasuring ? styles.stopButton : styles.startButton]}
        onPress={toggleMeasuring}
        activeOpacity={0.8}
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
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    color: Colors.text,
    marginTop: 10
  },
  placeholderBox: {
    alignSelf: 'stretch', // Changed from width: '100%'
    height: 150,
    backgroundColor: '#F0F4F8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#D1D9E6'
  },
  placeholderText: { color: Colors.textLight, fontSize: 16 },
  liveValue: { fontSize: 24, color: Colors.primary, marginTop: 10 },
  sensorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch', // Use stretch instead of width: '100%'
    marginBottom: 20
  },
  valueBox: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 15,
    flex: 1, // Use flex instead of width: '48%'
    marginHorizontal: 5,
    alignItems: 'center'
  },
  valueLabel: { fontSize: 12, color: Colors.textLight, marginBottom: 5 },
  valueText: { fontSize: 28, color: Colors.text },
  unitText: { fontSize: 12, color: Colors.textLight },
  button: {
    alignSelf: 'stretch',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10
  },
  startButton: { backgroundColor: Colors.primary },
  stopButton: { backgroundColor: Colors.error },
  buttonText: { color: '#FFFFFF', fontSize: 18 },
});

export default EarthquakeScreen;
