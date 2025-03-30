import { useState } from "react";
import { Settings } from "../types/settings";

const useSettingsStore = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem("settings");
    return savedSettings ? JSON.parse(savedSettings) : { newCardsPerDay: 10, notificationsEnabled: false };
  });

  const updateSettings = (newSettings: Settings) => {
    const validatedSettings = {
      ...newSettings,
      newCardsPerDay: Math.min(newSettings.newCardsPerDay, 15), 
    };

    setSettings(validatedSettings);
    localStorage.setItem("settings", JSON.stringify(validatedSettings));
  };

  return { settings, updateSettings };
};

export default useSettingsStore;
