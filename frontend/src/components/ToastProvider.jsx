import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = (id) => {
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );
    };

    const showToast = (type, message) => {
        const id = Date.now();

        setToasts((currentToasts) => [
            ...currentToasts,
            {
                id,
                type,
                message,
            },
        ]);

        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const value = {
        success: (message) => showToast("success", message),
        error: (message) => showToast("error", message),
        info: (message) => showToast("info", message),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast toast-${toast.type}`}
                    >
                        <p>{toast.message}</p>

                        <button
                            type="button"
                            onClick={() => removeToast(toast.id)}
                        >
                            Close
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    return useContext(ToastContext);
};

export default ToastProvider;
