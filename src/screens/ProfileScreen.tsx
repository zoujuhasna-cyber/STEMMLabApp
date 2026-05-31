import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import * as Battery from 'expo-battery';
import { auth } from '../services/firebaseConfig';
import { Colors } from '../constants/Colors';
import { getAllResults } from '../database/dbService';

const ProfileScreen = () => {
  const [stats, setStats] = useState({ total: 0, unique: 0, favorite: 'None' });
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const user = auth.currentUser;

  const loadData = async () => {
    try {
      // 1. Fetch Experiment Stats
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

      // 2. Fetch Battery Status
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', onPress: () => signOut(auth) }
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); loadData(); setRefreshing(false);}} />}
    >
      <View style={styles.header}>
        <Ionicons name="person-circle" size={100} color={Colors.primary} />
        <Text style={styles.name}>Lead Scientist</Text>
        <Text style={styles.email}>{user?.email || 'Guest User'}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Labs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.unique}</Text>
          <Text style={styles.statLabel}>Types</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Device Status</Text>

        <View style={styles.infoRow}>
          <Ionicons name="battery-charging" size={24} color={Colors.success} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Battery Level</Text>
            <Text style={styles.infoValue}>
              {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="heart" size={24} color={Colors.error} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Favorite Lab</Text>
            <Text style={styles.infoValue}>{stats.favorite}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>STEMM Lab v1.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: Colors.card,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  name: { fontSize: 24, fontWeight: '700', color: Colors.text, marginTop: 10 },
  email: { fontSize: 14, color: Colors.textLight, marginBottom: 15 },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutText: { color: Colors.error, fontWeight: '700' },
  statsGrid: { flexDirection: 'row', padding: 20, justifyContent: 'space-between' },
  statCard: {
    backgroundColor: Colors.card,
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  statValue: { fontSize: 24, fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: 12, color: Colors.textLight, marginTop: 5 },
  infoSection: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 15 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 10,
  },
  infoTextContainer: { marginLeft: 15 },
  infoLabel: { fontSize: 12, color: Colors.textLight },
  infoValue: { fontSize: 15, fontWeight: '700', color: Colors.text },
  footer: { padding: 20, alignItems: 'center', marginBottom: 20 },
  footerText: { fontSize: 12, color: Colors.textLight },
});

export default ProfileScreen;
