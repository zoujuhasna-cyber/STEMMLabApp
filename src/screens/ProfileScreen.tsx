import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { getAllResults } from '../database/dbService';

const ProfileScreen = () => {
  const [stats, setStats] = useState({ total: 0, unique: 0, favorite: 'None' });
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadStats = async () => {
    try {
      const data = await getAllResults();
      if (data && data.length > 0) {
        const uniqueNames = new Set(data.map((item: any) => item.experimentName));
        const counts: any = {};
        data.forEach((item: any) => {
          counts[item.experimentName] = (counts[item.experimentName] || 0) + 1;
        });
        const favorite = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

        setStats({
          total: Number(data.length),
          unique: Number(uniqueNames.size),
          favorite: String(favorite)
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isFocused) loadStats();
  }, [isFocused]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Ionicons name="person-circle" size={Number(100)} color={Colors.primary} />
        <Text style={styles.name}>Student Scientist</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{Number(stats.total)}</Text>
          <Text style={styles.statLabel}>Total Labs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{Number(stats.unique)}</Text>
          <Text style={styles.statLabel}>Types</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="heart" size={Number(24)} color={Colors.error} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoLabel}>Favorite</Text>
          <Text style={styles.infoValue}>{String(stats.favorite)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: Number(1), backgroundColor: Colors.background },
  header: {
    alignItems: 'center',
    paddingVertical: Number(30),
    backgroundColor: Colors.card,
    borderBottomLeftRadius: Number(30),
    borderBottomRightRadius: Number(30),
    // REMOVED elevation
    borderBottomWidth: Number(1),
    borderBottomColor: '#EEE',
  },
  name: { fontSize: Number(24), fontWeight: '700', color: Colors.text, marginTop: Number(10) },
  statsGrid: { flexDirection: 'row', padding: Number(20), justifyContent: 'space-between' },
  statCard: {
    backgroundColor: Colors.card,
    width: '48%',
    padding: Number(20),
    borderRadius: Number(15),
    alignItems: 'center',
    borderWidth: Number(1),
    borderColor: '#EEE',
  },
  statValue: { fontSize: Number(24), fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: Number(12), color: Colors.textLight, marginTop: Number(5) },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: Number(20),
    padding: Number(15),
    borderRadius: Number(12),
    borderWidth: Number(1),
    borderColor: '#EEE',
  },
  infoTextContainer: { marginLeft: Number(15) },
  infoLabel: { fontSize: Number(12), color: Colors.textLight },
  infoValue: { fontSize: Number(15), fontWeight: '700', color: Colors.text },
});

export default ProfileScreen;
