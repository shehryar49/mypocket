import React from "react";
import { IoMdClose } from "react-icons/io";

const SavedPasswordsLayout = ({ savedPasswords, handleRemove }) => {
  return (
    <div className="mt-2">
      {/* Heading */}
      <div className="flex justify-start items-start w-full md:block">
        <h1 className="text-2xl font-medium text-blue-900 dark:text-gray-200 ml-10">
          Saved Passwords
        </h1>
      </div>

      <div className="flex flex-col items-center mt-2 lg:mx-6 mx-6 md:mx-0">
        {/* Container for the passwords */}
        <div
          className={`w-full overflow-x-auto h-96 overflow-y-auto py-4 dark:bg-gray-800`}
        >
          {/* Header Row */}
          <div className="flex justify-between min-w-[600px] md:min-w-0 md:flex-wrap font-normal text-zinc-500 lg:text-sm">
            <span className="w-1/12 lg:text-sm text-xs text-left bg-zinc-100 dark:bg-gray-600 dark:text-gray-300 p-2">
              Sr.No
            </span>
            <span className="w-1/5 lg:text-sm text-xs text-left bg-zinc-100 dark:bg-gray-600 dark:text-gray-300 p-2">
              Date
            </span>
            <span className="w-1/5 lg:text-sm text-xs text-left bg-zinc-100 dark:bg-gray-600 dark:text-gray-300 p-2">
              Note
            </span>
            <span className="w-1/5 lg:text-sm text-xs text-left bg-zinc-100 dark:bg-gray-600 dark:text-gray-300 p-2">
              Email
            </span>
            <span className="w-1/5 lg:text-sm text-xs text-left bg-zinc-100 dark:bg-gray-600 dark:text-gray-300 p-2">
              Password
            </span>
            <span className="w-1/12 text-xs md:text-sm text-left bg-zinc-100 dark:bg-gray-600 dark:text-gray-300 p-2">
              Action
            </span>
          </div>

          {/* Data */}
          {savedPasswords.map((data) => {
            return (
              <div
                key={data.serialNumber}
                className="flex justify-between min-w-[600px] md:min-w-0 md:flex-wrap items-center py-2 shadow-sm font-normal text-zinc-500 dark:text-gray-200"
              >
                {/* Serial Number */}
                <span className="w-1/12 text-xs text-left pl-2">
                  {data.serialNumber}
                </span>

                {/* Date */}
                <span className="w-1/5 text-xs text-left pl-2">
                  {data.date}
                </span>

                {/* Note */}
                <span className="w-1/5 text-xs text-left pl-2">
                  {(() => {
                    const words = data.note.split(" ");
                    return words.length > 3
                      ? `${words.slice(0, 3).join(" ")}...`
                      : data.note;
                  })()}
                </span>

                {/* Email */}
                <span className="w-1/5 text-xs text-left pl-2 break-words">
                  {data.email}
                </span>

                {/* Password */}
                <span className="w-1/5 text-xs text-left pl-2 break-words">
                  {data.maskedPassword}
                </span>

                {/* Action */}
                <button
                  onClick={() => handleRemove(data.serialNumber)}
                  className="w-1/12 text-sm flex justify-center"
                >
                  <IoMdClose className="text-black dark:text-gray-200 dark:hover:text-blue-400 hover:text-zinc-500 transition-all" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedPasswordsLayout;
