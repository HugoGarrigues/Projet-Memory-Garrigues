import React, { useState, useEffect } from "react";
import { Settings } from "../types/settings";
import useSettingsStore from "../store/UseSettingsStore";

interface SettingsFormProps {
    initialSettings: Settings;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings }) => {
    const { updateSettings } = useSettingsStore();
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(initialSettings.notificationsEnabled);
    const [notificationTime, setNotificationTime] = useState<string>(initialSettings.notificationTime || "");

    useEffect(() => {
        if (notificationsEnabled !== initialSettings.notificationsEnabled) {
            if (notificationsEnabled && Notification.permission !== "granted") {
                Notification.requestPermission();
            }
        }
    }, [notificationsEnabled, initialSettings]);

    const handleSave = () => {
        const newSettings: Settings = {
            notificationsEnabled,
            notificationTime,
        };
        updateSettings(newSettings);

        if (notificationsEnabled && notificationTime) {
            scheduleDailyNotification(notificationTime);
        }
    };

    const scheduleDailyNotification = (time: string) => {
        const [hour, minute] = time.split(":").map(Number);
        const now = new Date();
        const firstNotificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

        if (firstNotificationTime < now) {
            firstNotificationTime.setDate(firstNotificationTime.getDate() + 1);
        }

        const delay = firstNotificationTime.getTime() - now.getTime();

        setTimeout(() => {
            if (Notification.permission === "granted") {
                new Notification("Il est l'heure de réviser malheuresement !", {
                    body: "Allez hop hop hop.",
                    icon: "path-to-icon.png",
                });
            }
        }, delay);
    };

    return (
        <div className="bg-base-200 p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Paramètres généraux</h3>

            {/* Permet a l'user d'activer  les notifications */}
            <div className="mb-6 flex items-center space-x-2">
                <label className="text-lg">Activer les notifications</label>
                <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled((prev) => !prev)}
                    className="toggle toggle-primary"
                />
            </div>

            {/* Heure du rappel quotidien */}
            {notificationsEnabled && (
                <div className="mb-6">
                    <label className="text-lg">Heure du rappel quotidien</label>
                    <input
                        type="time"
                        value={notificationTime}
                        onChange={(e) => setNotificationTime(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
            )}

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
