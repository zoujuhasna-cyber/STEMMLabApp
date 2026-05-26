import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { saveResult } from '../database/dbService';

const ReactionTimeScreen = () => {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'active' | 'result'>('idle');
  const [startTime, setStartTime] = useState(Number(0));
  const [reactionTime, setReactionTime] = useState(Number(0));
  const [timerHandle, setTimerHandle] = useState<any>(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(Number(0));

    const delay = Math.floor(Math.random() * Number(3000)) + Number(2000);
    const timeout = setTimeout(() => {
      setGameState('active');
      setStartTime(Date.now());
    }, delay);

    setTimerHandle(timeout);
  };

  const handlePress = () => {
    if (gameState === 'waiting') {
      if (timerHandle) clearTimeout(timerHandle);
      Alert.alert('Too early!', 'Wait for green!');
      setGameState('idle');
    } else if (gameState === 'active') {
      const diff = Date.now() - startTime;
      const safeDiff = Number.isFinite(diff) ? diff : Number(0);
      setReactionTime(Number(safeDiff));
      setGameState('result');
      saveResult('Reaction Time', `${safeDiff} ms`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaction Time</Text>

      <TouchableOpacity
        style={[
          styles.gameArea,
          gameState === 'waiting' && styles.waiting,
          gameState === 'active' && styles.active,
        ]}
        onPress={handlePress}
        disabled={gameState === 'idle' || gameState === 'result'}
        activeOpacity={Number(1.0)}
      >
        {gameState === 'idle' && (
          <TouchableOpacity style={styles.button} onPress={startTest}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
        )}

        {gameState === 'waiting' && <Text style={styles.statusText}>Wait...</Text>}
        {gameState === 'active' && <Text style={styles.statusText}>TAP!</Text>}

        {gameState === 'result' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultValue}>{Number(reactionTime)} ms</Text>
            <TouchableOpacity style={styles.button} onPress={startTest}>
              <Text style={styles.buttonText}>RETRY</Text>
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: Number(24),
    color: Colors.text,
    marginTop: Number(10)
  },
  gameArea: {
    alignSelf: 'stretch', // Changed from width: '100%'
    flex: Number(1),
    backgroundColor: Colors.card,
    borderRadius: Number(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Number(20),
    borderWidth: Number(1),
    borderColor: '#EEEEEE'
  },
  waiting: { backgroundColor: '#FFD54F' },
  active: { backgroundColor: '#66BB6A' },
  statusText: { fontSize: Number(32), color: '#FFFFFF' },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Number(40),
    paddingVertical: Number(15),
    borderRadius: Number(30)
  },
  buttonText: { color: '#FFFFFF', fontSize: Number(20) },
  resultContainer: { alignItems: 'center' },
  resultValue: { fontSize: Number(50), color: Colors.primary, marginVertical: Number(20) },
});

export default ReactionTimeScreen;
