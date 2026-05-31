import * as SQLite from 'expo-sqlite';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db as firestoreDb, auth } from '../services/firebaseConfig';
import { Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Try to import notifications safely
let Notifications: any = null;
try {
  Notifications = require('expo-notifications');
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
} catch (e) {
  console.log('Notifications module not available');
}

const sqliteDb = SQLite.openDatabaseSync('stemm_labs.db');

export const initDatabase = async () => {
  try {
    await sqliteDb.execAsync(`
      CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        experimentName TEXT NOT NULL,
        score TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error('SQLite Init Error:', error);
  }
};

/**
 * Triggers a Tray Notification
 */
const triggerNotification = async (title: string, body: string) => {
  if (Notifications) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: { title, body, data: { data: 'goes here' } },
        trigger: null, // show immediately
      });
    } catch (err) {
      // Fallback to Alert if tray notification fails
      Alert.alert(title, body);
    }
  } else {
    Alert.alert(title, body);
  }
};

export const saveResult = async (experimentName: string, score: string) => {
  const timestamp = new Date().toLocaleString();

  try {
    // 1. LOCAL SAVE
    await sqliteDb.runAsync(
      'INSERT INTO results (experimentName, score, timestamp) VALUES (?, ?, ?)',
      [experimentName, score, timestamp]
    );

    // 2. CLOUD SYNC
    if (auth.currentUser) {
      try {
        await addDoc(collection(firestoreDb, "lab_results"), {
          userId: auth.currentUser.uid,
          userEmail: auth.currentUser.email,
          experiment: experimentName,
          result: score,
          time: timestamp,
          createdAt: serverTimestamp()
        });
      } catch (fbError) {
        console.warn('Firebase Sync Skip');
      }
    }

    // 3. TRIGGER NOTIFICATION
    await triggerNotification(
      "🧪 Lab Result Recorded",
      `${experimentName}: ${score}`
    );

  } catch (error) {
    console.error('Save Error:', error);
  }
};

export const getAllResults = async () => {
  try {
    return await sqliteDb.getAllAsync('SELECT * FROM results ORDER BY id DESC');
  } catch (error) {
    return [];
  }
};

export const exportResultsToCSV = async () => {
  try {
    const results: any[] = await getAllResults();
    if (results.length === 0) return false;
    let csvContent = 'ID,Experiment,Result,Date\n';
    results.forEach(row => {
      csvContent += `${row.id},${row.experimentName},${row.score},${row.timestamp}\n`;
    });
    const fileUri = `${FileSystem.documentDirectory}stemm_lab_results.csv`;
    await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const clearAllResults = async () => {
  try {
    await sqliteDb.runAsync('DELETE FROM results');
    return true;
  } catch (error) {
    return false;
  }
};
