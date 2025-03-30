import {useEffect, useState } from "react";
import SettingsForm from "../components/SettingsForm";
import useSettingsStore from "../store/UseSettingsStore";

const SettingsPage = () => {
  const { settings } = useSettingsStore(); 

  const [initialSettings, setInitialSettings] = useState(settings);

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setInitialSettings(JSON.parse(savedSettings)); 
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-6">Paramètres de Révision</h2>
      
      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
};

export default SettingsPage;
