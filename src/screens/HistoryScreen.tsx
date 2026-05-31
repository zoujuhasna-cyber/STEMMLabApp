import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { getAllResults } from '../database/dbService';

const HistoryScreen = () => {
  const [results, setResults] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const loadResults = async () => {
    try {
      const data = await getAllResults();
      setResults(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) loadResults();
  }, [isFocused]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.resultItem}>
      <View style={styles.itemContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.experimentName}>{String(item.experimentName)}</Text>
          <Text style={styles.timestamp}>{String(item.timestamp).split(',')[0]}</Text>
        </View>
        <Text style={styles.scoreText}>
            Result: <Text style={styles.scoreValue}>{String(item.score)}</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No history yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: Number(1),
    backgroundColor: Colors.background
  },
  listContent: {
    padding: Number(20)
  },
  resultItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: Number(12),
    padding: Number(15),
    marginBottom: Number(10),
    borderWidth: Number(1),
    borderColor: '#EEEEEE'
  },
  itemContent: {
    flex: Number(1)
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Number(5)
  },
  experimentName: {
    fontSize: Number(15),
    fontWeight: '700'
  },
  timestamp: {
    fontSize: Number(11),
    color: '#777777'
  },
  scoreText: {
    fontSize: Number(13),
    color: '#555555'
  },
  scoreValue: {
    fontWeight: '700',
    color: Colors.primary
  },
  emptyContainer: {
    flex: Number(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Number(100)
  },
  emptyText: {
    fontSize: Number(16),
    color: '#777777'
  },
});

export default HistoryScreen;
