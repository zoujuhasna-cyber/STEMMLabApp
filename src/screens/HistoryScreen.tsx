import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { getAllResults } from '../database/dbService';

const HistoryScreen = () => {
  const [results, setResults] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const loadResults = async () => {
    const data = await getAllResults();
    setResults(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadResults();
    }
  }, [isFocused]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultHeader}>
        <Text style={styles.experimentName}>{item.experimentName}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.scoreText}>Result: <Text style={styles.scoreValue}>{item.score}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No experiment history yet.</Text>
          <Text style={styles.emptySubtext}>Try an experiment to see results here!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 20,
  },
  resultItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  experimentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
  scoreText: {
    fontSize: 14,
    color: Colors.text,
  },
  scoreValue: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HistoryScreen;
