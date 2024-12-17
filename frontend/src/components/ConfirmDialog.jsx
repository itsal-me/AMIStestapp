function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div
                    className="fixed inset-0 bg-black opacity-30"
                    onClick={onCancel}
                ></div>
                <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-light-900">
                            {title}
                        </h3>
                        <p className="mt-2 text-light-700">{message}</p>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-light-700 hover:text-light-900"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
