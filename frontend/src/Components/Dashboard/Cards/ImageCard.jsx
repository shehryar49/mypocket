import React from "react";
import { FaImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ImageCard = () => {
  const navigate=useNavigate();
  const {setSearchedText} = useAuth();
  const showImages = () => {
    setSearchedText(".png");
    navigate("/dashboard/myfiles");
  };
  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap")
        `}
      </style>

      <div
        style={{ fontFamily: "Plus Jakarta Sans" }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-4 2xl:w-full w-80 max-w-sm before:absolute before:top-0 before:left-0 before:w-40 before:h-14 before:bg-blue-100 dark:before:bg-blue-600 before:rounded-br-full before:z-0 after:absolute after:bottom-0 after:right-0 after:w-32 after:h-12 after:bg-blue-100 dark:after:bg-blue-600 after:rounded-tl-full after:z-0"
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Image */}
          <div className="relative">
            <div
              className="absolute 2xl:ml-52 ml-40 mt-3 w-24"
              style={{
                transform: "rotate(-10deg)",
                transformOrigin: "top left",
              }}
            >
              <img src="/assets/Camera.png" alt="camera" className="w-24 h-20" />
              {/* Shadow img */}
              
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              {/* Image icon */}
              <div>
                <span role="img" aria-label="images">
                  <FaImage className="text-lg text-gray-600 dark:text-gray-300" />
                </span>
              </div>
              {/* Text */}
              <h2 className="ml-4 font-semibold text-lg text-gray-800 dark:text-gray-200">Images</h2>

              {/* Files */}
              <p className="text-sm text-gray-400 font-normal 2xl:ml-40 ml-24 mt-2 dark:text-gray-400">
                
              </p>
            </div>

            {/* Shared with */}
            <div className="mt-10">
              <p className="text-sm text-gray-400 font-normal mb-1 dark:text-gray-400">
              
              </p>
              <div className="flex items-center">
                
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="flex justify-between items-center mt-12">
            <p className="text-gray-400 font-normal self-end text-sm dark:text-gray-400">
              
            </p>
            <button onClick={()=>{showImages()}} className="text-black dark:text-white flex items-center mr-5 self-end hover:text-blue-500 dark:hover:text-blue-300">
              Open
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
