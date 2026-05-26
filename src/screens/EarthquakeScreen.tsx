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
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);

        // Calculate total acceleration (vibration intensity)
        const intensity = Math.sqrt(
          accelerometerData.x ** 2 +
          accelerometerData.y ** 2 +
          accelerometerData.z ** 2
        ) - 1; // Subtract 1g (gravity)

        const absoluteIntensity = Math.abs(intensity);
        if (absoluteIntensity > maxVibration) {
          setMaxVibration(absoluteIntensity);
        }
      })
    );
    Accelerometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vibration / Earthquake Sensor</Text>
      <Text style={styles.description}>
        Place your phone on a flat surface to measure vibrations.
      </Text>

      <View style={styles.sensorContainer}>
        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Current Vibration</Text>
          <Text style={styles.valueText}>
            {(Math.sqrt(data.x**2 + data.y**2 + data.z**2) - 1).toFixed(2)}
          </Text>
          <Text style={styles.unitText}>g-force</Text>
        </View>

        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Maximum Detected</Text>
          <Text style={[styles.valueText, { color: Colors.primary }]}>
            {maxVibration.toFixed(2)}
          </Text>
          <Text style={styles.unitText}>g-force</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isMeasuring ? styles.stopButton : styles.startButton]}
        onPress={toggleMeasuring}
      >
        <Text style={styles.buttonText}>
          {isMeasuring ? 'STOP & SAVE' : 'START MEASURING'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>What are you measuring?</Text>
        <Text style={styles.infoText}>
          The accelerometer detects tiny movements. 0.01g is a light vibration, while 0.5g+ is a strong shake!
        </Text>
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
  sensorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  valueBox: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
  },
  valueLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 5,
  },
  valueText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  unitText: {
    fontSize: 12,
    color: Colors.textLight,
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
  infoBox: {
    backgroundColor: '#E1F5FE',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#0288D1',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    color: '#0277BD',
  }
});

export default EarthquakeScreen;
