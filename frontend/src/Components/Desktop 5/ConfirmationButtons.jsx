import React from "react";

const ConfirmationButtons = ({ handleCancel }) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-4 mt-8 mb-6">
        {/* Confirm Button */}
        <button className="bg-blue-500 dark:bg-blue-700 dark:hover:bg-opacity-80 dark:text-gray-200 transition-all p-2 w-[139px] rounded-md h-12 text-white hover:bg-opacity-85 flex flex-1 justify-center items-center">
          Confirm
        </button>

        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="border-2 border-blue-500 p-2 w-[139px] text-blue-500 transition-all rounded-md h-12 dark:hover:opacity-80 hover:opacity-70 flex flex-1 justify-center items-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationButtons;
