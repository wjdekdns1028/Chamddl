import React, { useEffect, useState } from 'react';
import './Toast.css';

export default function Toast({ message, isAdmin }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`} style={{ bottom: isAdmin ? 80 : 30 }}>
      {message}
    </div>
  );
}
