import React, { useState, useEffect } from 'react';
import './Snackbar.css';

function Snackbar({ message, onClose }) {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (message) {
        setShowSnackbar(true);

        const timer = setTimeout(() => {
            setShowSnackbar(false);
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }
  }, [message]);

  return (
    <div className={`snackbar ${showSnackbar ? 'show' : ''}`}>
          <span className="message">{message}</span>
    </div>
  );
}

export default Snackbar;
