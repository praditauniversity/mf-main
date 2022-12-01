import React from "react";

const ErrorHandler = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = (error) => {
        setError(error);
    };

    const handleReset = () => {
        setError(null);
    };

    const errorMessage = error ? error.message : null;

    return (
        <ErrorContext.Provider value={{ error, errorMessage, handleError, handleReset }}>
            {children}
        </ErrorContext.Provider>
    );
}

export default ErrorHandler;