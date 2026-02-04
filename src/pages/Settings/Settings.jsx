import React, { useState, useEffect } from "react";

export default function Settings(){
  const [name, setName] = useState(localStorage.getItem('madrasa_name') || 'مدرسۃ المدینہ');
  const [googleClientId, setGoogleClientId] = useState(localStorage.getItem('google_client_id') || '');

  useEffect(()=>{
    localStorage.setItem('madrasa_name', name);
  }, [name]);

  const saveGoogle = ()=>{
    localStorage.setItem('google_client_id', googleClientId);
    alert('Google Client ID saved. Refresh login page to enable Google Sign-In.');
  };

  return (
    <div>
      <h1>Settings (ترتیبات)</h1>
      <div className="card" style={{maxWidth:640}}>
        <div className="form-row"><label>مدرسہ کا نام</label><input value={name} onChange={e=>setName(e.target.value)} /></div>
        <div className="form-row">
          <label>Google OAuth Client ID (optional)</label>
          <input value={googleClientId} onChange={e=>setGoogleClientId(e.target.value)} placeholder="Enter Google client id" />
          <div style={{marginTop:8}}><button onClick={saveGoogle}>Save</button></div>
        </div>
      </div>
    </div>
  );
}
