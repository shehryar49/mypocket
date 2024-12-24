import React from "react";

const ConfirmationButtons = ({handleSubmit, handleCancel }) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-4 mt-8 mb-6">

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
