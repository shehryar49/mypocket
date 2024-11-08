import React from "react";
import { MdInsertDriveFile } from "react-icons/md";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

const Fileslayout = ({ files, setFiles, access, fileAdded, setFileAdded }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-center mt-4 lg:mx-6 mx-6 md:mx-0">
        {/* Container for the files */}
        <div className="w-full overflow-x-auto h-screen p-4">
          {/* Header Row */}
          <div className="flex justify-between min-w-[600px] md:min-w-0 text-xs lg:text-sm font-semibold text-slate-800 dark:text-slate-300 border-slate-300 border-b border-t py-4 px-2">
            {/* Name */}
            <span className="w-[40%] min-w-[150px] flex items-center">
              Name
              <span className="flex flex-col items-center ml-1"></span>
            </span>

            {/* Last Modified */}
            <span className="w-[30%] min-w-[120px] flex flex-col items-start">
              <span className="flex items-center">
                Modified
                <span className="flex flex-col items-center ml-1 mr-8"></span>
              </span>
            </span>

            {/* Acces */}
            <span className="w-[20%] min-w-[100px] flex flex-col items-start justify-center mr-8 lg:mr-10 2xl:mr-20">
              <span className="flex items-center truncate">
                Who can access
                <span className="flex flex-col items-center ml-1"></span>
              </span>
            </span>
          </div>

          {/* Files Data */}
          {files &&
            files.map((file, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between min-w-[600px] md:min-w-0 text-slate-600 dark:text-slate-200 items-center py-2 shadow-sm text-sm font-semibold border-b"
                >
                  {/*{/* File Name with Icon */}
                  <span className="w-[40%] min-w-[150px] flex items-center space-x-2">
                    <MdInsertDriveFile className="text-blue-400 text-xl dark:text-blue-600" />

                    <span className="text-xs lg:text-sm break-words">
                      {file?.name}
                    </span>
                  </span>

                  {/* Modified Date */}
                  <span className="w-[30%] min-w-[120px] text-xs lg:text-sm text-start  font-normal">
                    {new Date(file?.lastModifiedDate).toLocaleDateString()}
                  </span>

                  {/* File Permission*/}
                  <div className="w-[20%] min-w-[100px] text-xs lg:text-sm text-left flex items-center mr-9 2xl:mr-20 justify-start">
                    {access === "onlyYou"
                      ? "Only You"
                      : access === "specificPeople"
                      ? "Specific People"
                      : null}
                  </div>
                </div>
              );
            })}
          <Dropzone
            onDrop={(acceptedFiles) => {
              setFiles((prevFiles) =>
                prevFiles ? [...prevFiles, ...acceptedFiles] : acceptedFiles
              );
              setFileAdded(true);
              toast.success("File added successfully!");
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="z-10">
                    <div className="flex items-center flex-col mt-20 justify-center cursor-pointer">
                      <h1
                        className={`font-medium text-xl dark:text-gray-200 ${
                          fileAdded && "hidden"
                        }`}
                      >
                        This Folder is empty
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Drag and drop files or Click onto this window to upload
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    </div>
  );
};

export default Fileslayout;
