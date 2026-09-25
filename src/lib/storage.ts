import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: "onboarding.completed",
} as const;

const storage = {
  async getBoolean(key: string, defaultValue: boolean): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return defaultValue;
      }
      return JSON.parse(value) as boolean;
    } catch (error) {
      console.error(`[Storage] Failed to read "${key}"`, error);
      return defaultValue;
    }
  },

  async setBoolean(key: string, value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[Storage] Failed to write "${key}"`, error);
      throw error;
    }
  },

  async removeBoolean(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[Storage] Failed to remove "${key}"`, error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`[Storage] Failed to clear storage`, error);
      throw error;
    }
  },

  
};

export const appStorage = {
  async hasCompletedOnboarding(): Promise<boolean> {
    return storage.getBoolean(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
  },

  async setCompletedOnboarding(value: boolean): Promise<void> {
    return storage.setBoolean(STORAGE_KEYS.ONBOARDING_COMPLETED, value);
  },

  async removeCompletedOnboarding(): Promise<void> {
    return storage.removeBoolean(STORAGE_KEYS.ONBOARDING_COMPLETED);
  },
};