import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';


const BreathingTrackerScreen = () => {
  const [data, setData] = useState<number[]>(new Array(20).fill(0));
  const [subscription, setSubscription] = useState<any>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelData => {
        // We focus on the Z axis (up/down movement when phone is on chest)
        const zValue = accelData.z;
        setData(prevData => {
          const newData = [...prevData, zValue];
          return newData.slice(-20); // Keep last 20 points for the graph
        });
      })
    );
    Accelerometer.setUpdateInterval(200);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const toggleTracking = () => {
    if (isTracking) {
      _unsubscribe();
      const duration = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      saveResult('Breathing Tracker', `Tracked for ${duration}s`);
    } else {
      setStartTime(Date.now());
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
      <Text style={styles.description}>
        Lie down and place the phone on your chest. Breathe naturally to see your rhythm.
      </Text>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: [],
            datasets: [{ data: data }]
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: Colors.card,
            backgroundGradientFrom: Colors.card,
            backgroundGradientTo: Colors.card,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
            style: { borderRadius: 16 }
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isTracking ? styles.stopButton : styles.startButton]}
        onPress={toggleTracking}
      >
        <Text style={styles.buttonText}>
          {isTracking ? 'STOP TRACKING' : 'START TRACKING'}
        </Text>
      </TouchableOpacity>

      <View style={styles.instructionBox}>
        <Text style={styles.instructionTitle}>How it works:</Text>
        <Text style={styles.instructionText}>
          The graph shows your chest moving up and down. A steady wave indicates calm, regular breathing.
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
  chartContainer: {
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  chart: {
    borderRadius: 16,
  },
  button: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
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
  instructionBox: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  instructionTitle: {
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 13,
    color: '#1B5E20',
  }
});

export default BreathingTrackerScreen;
