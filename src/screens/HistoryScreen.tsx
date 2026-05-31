import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { getAllResults, clearAllResults, exportResultsToCSV } from '../database/dbService';

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

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all experiment results?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllResults();
            if (success) {
              setResults([]);
              Alert.alert('History Cleared');
            }
          }
        },
      ]
    );
  };

  const handleExportCSV = async () => {
    const success = await exportResultsToCSV();
    if (success) {
      Alert.alert("Success", "Experiment data exported to CSV successfully.");
    }
  };

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
        <>
          <FlatList
            data={results}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.exportButton}
              onPress={handleExportCSV}
            >
              <Text style={styles.buttonText}>Export to CSV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearHistory}
            >
              <Text style={styles.buttonText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        </>
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
  buttonContainer: {
    padding: Number(20),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exportButton: {
    backgroundColor: Colors.success,
    flex: Number(0.48),
    padding: Number(15),
    borderRadius: Number(10),
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: Colors.error,
    flex: Number(0.48),
    padding: Number(15),
    borderRadius: Number(10),
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: Number(14),
  }
});

export default HistoryScreen;
