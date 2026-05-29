import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';

const ReactionTimeScreen = () => {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'active' | 'result'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [timerHandle, setTimerHandle] = useState<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);

    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    const timeout = setTimeout(() => {
      setGameState('active');
      setStartTime(Date.now());
    }, delay);

    setTimerHandle(timeout);
  };

  const handlePress = () => {
    if (gameState === 'waiting') {
      if (timerHandle) clearTimeout(timerHandle);
      Alert.alert('Too early!', 'Wait for the color to change to green.');
      setGameState('idle');
    } else if (gameState === 'active') {
      const endTime = Date.now();
      const diff = endTime - startTime;
      setReactionTime(diff);
      setGameState('result');

      // Save the result to local storage (SQLite)
      saveResult('Reaction Time', `${diff} ms`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaction Time Test</Text>
      <Text style={styles.description}>
        Tap "Start", then tap the screen as fast as you can when it turns GREEN!
      </Text>

      <TouchableOpacity
        style={[
          styles.gameArea,
          gameState === 'waiting' && styles.waiting,
          gameState === 'active' && styles.active,
        ]}
        onPress={handlePress}
        disabled={gameState === 'idle' || gameState === 'result'}
        activeOpacity={1}
      >
        {gameState === 'idle' && (
          <TouchableOpacity style={styles.button} onPress={startTest}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
        )}

        {gameState === 'waiting' && (
          <Text style={styles.statusText}>Wait for it...</Text>
        )}

        {gameState === 'active' && (
          <Text style={styles.statusText}>TAP NOW!</Text>
        )}

        {gameState === 'result' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Your Time:</Text>
            <Text style={styles.resultValue}>{reactionTime} ms</Text>
            <TouchableOpacity style={styles.button} onPress={startTest}>
              <Text style={styles.buttonText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginVertical: 20,
  },
  gameArea: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  waiting: {
    backgroundColor: '#FFE082', // Yellow/Amber
  },
  active: {
    backgroundColor: '#81C784', // Green
  },
  statusText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 24,
    color: Colors.text,
  },
  resultValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 20,
  },
});

export default ReactionTimeScreen;
