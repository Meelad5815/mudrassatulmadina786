"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [googleClientId, setGoogleClientId] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("madrasa_name") || "\u0645\u062F\u0631\u0633\u06C3 \u0627\u0644\u0645\u062F\u06CC\u0646\u06C1");
    setGoogleClientId(localStorage.getItem("google_client_id") || "");
  }, []);

  useEffect(() => {
    if (name) localStorage.setItem("madrasa_name", name);
  }, [name]);

  const saveGoogle = () => {
    localStorage.setItem("google_client_id", googleClientId);
    alert("Google Client ID saved. Refresh login page to enable Google Sign-In.");
  };

  return (
    <div>
      <h1>{"Settings (\u062A\u0631\u062A\u06CC\u0628\u0627\u062A)"}</h1>
      <div className="card" style={{ maxWidth: 640 }}>
        <div className="form-row">
          <label>{"\u0645\u062F\u0631\u0633\u06C1 \u06A9\u0627 \u0646\u0627\u0645"}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-row">
          <label>{"Google OAuth Client ID (optional)"}</label>
          <input value={googleClientId} onChange={(e) => setGoogleClientId(e.target.value)} placeholder="Enter Google client id" />
          <div style={{ marginTop: 8 }}>
            <button onClick={saveGoogle}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
