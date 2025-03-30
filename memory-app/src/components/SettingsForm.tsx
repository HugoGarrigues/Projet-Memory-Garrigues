import React, { useState, useEffect } from "react";
import { Settings } from "../types/settings";
import useSettingsStore from "../store/UseSettingsStore";

interface SettingsFormProps {
    initialSettings: Settings;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings }) => {
    const { updateSettings } = useSettingsStore();

    const [newCardsPerDay, setNewCardsPerDay] = useState<number>(initialSettings.newCardsPerDay);
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(initialSettings.notificationsEnabled);

    useEffect(() => {
        if (
            newCardsPerDay !== initialSettings.newCardsPerDay ||
            notificationsEnabled !== initialSettings.notificationsEnabled
        ) {
        }
    }, [newCardsPerDay, notificationsEnabled, initialSettings]);

    const handleSave = () => {
        const newSettings: Settings = {
            newCardsPerDay,
            notificationsEnabled,
        };
        updateSettings(newSettings);
    };

    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Paramètres généraux</h3>

            {/* Nouvelles cartes par jour */}
            <div className="mb-4">
                <label className="block text-lg mb-2" htmlFor="newCardsPerDay">
                    Nombre de nouvelles cartes par jour
                </label>
                <input
                    id="newCardsPerDay"
                    type="number"
                    value={newCardsPerDay}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value < 0) {
                            setNewCardsPerDay(0); 
                        } else if (value > 15) {
                            setNewCardsPerDay(15);
                        } else {
                            setNewCardsPerDay(value);
                        }
                    }}
                    className="input input-bordered w-full"
                    max="15" 
                    min="0" 
                />
            </div>

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
