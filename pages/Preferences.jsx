import React, { useState, useEffect } from "react";
import axios from "axios";
import "../cssFiles/preferences.css";

const Preferences = () => {
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [displayLayout, setDisplayLayout] = useState("grid");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user preferences from the server
    const fetchPreferences = async () => {
      try {
        const response = await axios.get("http://localhost:5173/preferences", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const { theme, notifications_enabled, display_layout } = response.data;
        setTheme(theme);
        setNotificationsEnabled(notifications_enabled);
        setDisplayLayout(display_layout);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5173/preferences",
        { theme, notificationsEnabled, displayLayout },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Preferences saved successfully!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      setMessage("Failed to save preferences.");
    }
  };

  return (
    <div className="preferences-page">
      <h1>Preferences</h1>
      <form className="preferences-form" onSubmit={handleSave}>
        <div className="form-group">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="form-group">
          <label>Enable Notifications:</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Display Layout:</label>
          <select
            value={displayLayout}
            onChange={(e) => setDisplayLayout(e.target.value)}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>
        <button type="submit" className="save-button">
          Save Preferences
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Preferences;
