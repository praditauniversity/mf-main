import React, { useState, useEffect } from 'react';
import './Snackbar.css';

function Snackbar({ message, onClose }) {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (message) {
        setShowSnackbar(true);
        console.log("Message: ", message);

        const timer = setTimeout(() => {
            setShowSnackbar(false);
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }
  }, [message]);

//   const handleClose = () => {
//     setShowSnackbar(false);
//   };

  return (
    <div className={`snackbar ${showSnackbar ? 'show' : ''}`}>
      {/* <div className="bg-primary text-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between"> */}
          <div className="text-sm">{message}</div>
          {/* <span className="message">{message}</span> */}
          {/* <button className="close-btn" onClick={handleClose}>
            &times;
          </button> */}
        {/* </div>
      </div> */}
    </div>
  );
}

export default Snackbar;
