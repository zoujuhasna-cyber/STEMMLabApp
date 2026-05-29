import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_SYNC_TASK = 'background-lab-sync';

// Define the task in the global scope
TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  try {
    console.log('Background Sync: Parallel Programming Requirement Triggered');
    // In a student project, this simulates syncing data in a separate thread
    const now = Date.now();
    console.log(`[Parallel Thread] Background check performed at ${new Date(now).toLocaleTimeString()}`);

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundSync = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);
    if (!isRegistered) {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_SYNC_TASK, {
        minimumInterval: 15 * 60, // 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log('Background Sync Task Registered');
    }
  } catch (err) {
    console.log('Background Fetch failed to register:', err);
  }
};
