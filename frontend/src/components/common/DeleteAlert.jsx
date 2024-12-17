function DeleteAlert({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-light-900 ml-3">
                            {title}
                        </h3>
                    </div>

                    <p className="text-light-700 mb-6">{message}</p>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-light-700 hover:text-light-900"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAlert;
