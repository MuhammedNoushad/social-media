import React from "react";
import { FaPhoneSlash, FaPhoneAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface IncomingCallProps {
  callerName: string;
  callerImage: string;
  isOpen: boolean;
  onClose: () => void;
  onAcceptCall: () => void;
}

const IncomingCall: React.FC<IncomingCallProps> = ({
  callerName,
  callerImage,
  isOpen,
  onClose,
  onAcceptCall,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-1/5 h-80 shadow-lg p-6 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <IoClose className="h-6 w-6" />
        </button>
        <div className="mb-4">
          <img
            className="w-36 h-32 rounded-full mx-auto"
            src={callerImage}
            alt={`${callerName}'s profile`}
          />
        </div>
        <div className="text-lg font-semibold mb-2 font-roboto-condensed">
          Incoming Call...
        </div>
        <div className="text-xl font-bold">{callerName}</div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onAcceptCall}
            className="bg-green-500 text-white w-12 h-12 rounded-full mx-2 flex items-center justify-center"
          >
            <FaPhoneAlt className="h-6 w-6" />
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white w-12 h-12 rounded-full mx-2 flex items-center justify-center"
          >
            <FaPhoneSlash className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
