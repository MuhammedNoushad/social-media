function Dialog({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative transform w-full max-w-md p-6 my-8 overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="text-center">
            {/* Title */}
            <h3
              className="text-lg font-semibold text-gray-900"
              id="modal-title"
            >
              {title}
            </h3>
            <div className="mt-2">
              {/* Message */}
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>

          <div className="mt-4">
            {/* Confirm and Cancel Buttons */}
            <div className="flex justify-center">
              <button
                onClick={onConfirm}
                type="button"
                className="inline-block px-4 py-2 mr-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                type="button"
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
