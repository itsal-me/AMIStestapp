import { useEffect } from "react";

function Alert({ type = "info", message, onClose, autoClose = false }) {
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [autoClose, onClose]);

    const getAlertStyle = () => {
        switch (type) {
            case "success":
                return "bg-green-50 text-green-800 border-green-200";
            case "error":
                return "bg-red-50 text-red-800 border-red-200";
            case "warning":
                return "bg-yellow-50 text-yellow-800 border-yellow-200";
            default:
                return "bg-blue-50 text-blue-800 border-blue-200";
        }
    };

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl border shadow-lg max-w-md animate-slideIn ${getAlertStyle()}`}
        >
            <div className="flex items-start">
                <div className="flex-1">{message}</div>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Alert;
