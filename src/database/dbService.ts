import * as SQLite from 'expo-sqlite';

// Open the database (it will be created if it doesn't exist)
const db = SQLite.openDatabaseSync('stemm_labs.db');

export const initDatabase = async () => {
  try {
    // Create the results table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        experimentName TEXT NOT NULL,
        score TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const saveResult = async (experimentName: string, score: string) => {
  const timestamp = new Date().toLocaleString();
  try {
    await db.runAsync(
      'INSERT INTO results (experimentName, score, timestamp) VALUES (?, ?, ?)',
      [experimentName, score, timestamp]
    );
    console.log('Result saved');
  } catch (error) {
    console.error('Error saving result:', error);
  }
};

export const getAllResults = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM results ORDER BY id DESC');
    return allRows;
  } catch (error) {
    console.error('Error fetching results:', error);
    return [];
  }
};
