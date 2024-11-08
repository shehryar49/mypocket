import React from "react";

const SharedUser = ({ user, insideFiles, fileType, filesData }) => {
  const maxVisibleUsers = 4;
  const visibleUsers = user.slice(0, maxVisibleUsers);
  const extraUserCount = user.length - maxVisibleUsers;

  return (
    <div className="flex flex-col p-2 gap-2">
      {/* Headings */}
      <div className="flex items-center">
        <h1 className="text-gray-400 text-sm font-medium ml-6">Shared Users</h1>

        <h1 className="text-gray-400 text-sm font-medium ml-[75px]">
          Inside Files
        </h1>
      </div>

      {/* Inside files and shared files */}
      <div className="flex justify-between mx-8 mb-4">
        {/* Shared Users */}
        <div className="flex items-center flex-row">
          {visibleUsers.map((u, index) => (
            <div
              className="bg-sky-300 dark:bg-blue-600 border dark:border-blue-700 dark:text-gray-200 text-sm border-white w-7 h-7 flex items-center justify-center rounded-xl -ml-2"
              key={index}
            >
              {u[0]} {/* Display the first letter of the user's name */}
            </div>
          ))}

          {/* Show "+ more" if there are extra users */}
          {extraUserCount > 0 && (
            <div className="bg-sky-100 dark:bg-sky-300 font-semibold border text-sm text-blue-500 dark:text-blue-700 dark:border-sky-300 w-7 h-7 flex items-center justify-center rounded-xl -ml-2">
              +{extraUserCount}
            </div>
          )}
        </div>

        {/* Inside Files */}
        <div className="">
          {filesData
            .filter((file) => file.type === fileType) // Filter files by type
            .map((filteredFile, index) => (
              <div
                className="bg-sky-100 dark:bg-sky-300 w-20 h-9 rounded-xl p-2"
                key={index}
              >
                <p className="text-blue-500 dark:text-blue-700 text-sm font-semibold text-center">
                  {filteredFile.insideFiles}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SharedUser;
