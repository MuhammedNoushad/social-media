import React from "react";
import { IoClose } from "react-icons/io5";

interface OutGoingCallProps {
  callerName: string;
  callerImage: string;
  isOpen: boolean;
  onClose: () => void;
}

const OutGoingCall: React.FC<OutGoingCallProps> = ({
  callerName,
  callerImage,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-1/5 h-80 shadow-lg p-6 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-4">
          <img
            className="w-36 h-32 rounded-full mx-auto"
            src={callerImage}
            alt={`${callerName}'s profile`}
          />
        </div>
        <div className="text-lg font-semibold mb-2 font-roboto-condensed">
          Calling...
        </div>
        <div className="text-xl font-bold">{callerName}</div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white w-12 h-12 rounded-full mx-2 flex items-center justify-center"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutGoingCall;
