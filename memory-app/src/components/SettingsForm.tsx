import React, { useState, useEffect } from "react";
import { Settings } from "../types/settings";
import useSettingsStore from "../store/UseSettingsStore";

interface SettingsFormProps {
    initialSettings: Settings;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings }) => {
    const { updateSettings } = useSettingsStore();
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(initialSettings.notificationsEnabled);

    useEffect(() => {
        if (
            notificationsEnabled !== initialSettings.notificationsEnabled
        ) {
        }
    }, [notificationsEnabled, initialSettings]);

    const handleSave = () => {
        const newSettings: Settings = {
            notificationsEnabled,
        };
        updateSettings(newSettings);
    };

    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Paramètres généraux</h3>

            {/* Activer les notifications */}
            <div className="mb-6 flex items-center space-x-2">
                <label className="text-lg">Activer les notifications</label>
                <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled((prev) => !prev)}
                    className="toggle toggle-primary"
                />
            </div>


            <div className="mt-4">
                <button
                    onClick={handleSave}
                    className="btn btn-primary w-full"
                >
                    Sauvegarder
                </button>
            </div>

        </div>
    );
};

export default SettingsForm;
