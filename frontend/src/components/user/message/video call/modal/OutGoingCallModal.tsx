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
      <div className="bg-white rounded-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto shadow-lg p-4 md:p-6 text-center relative">
        <div className="mb-4">
          <img
            className="w-24 h-24 md:w-36 md:h-36 rounded-full mx-auto"
            src={callerImage}
            alt={`${callerName}'s profile`}
          />
        </div>
        <div className="text-lg md:text-xl font-semibold mb-2 font-roboto-condensed">
          Calling...
        </div>
        <div className="text-xl md:text-2xl font-bold">{callerName}</div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full mx-2 flex items-center justify-center"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutGoingCall;
