import React from "react";

const CloudPro = () => {
  return (
    <>
      <style>
        {`
  @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap")
  `}
      </style>
      <div
        className="bg-black md:w-[505px] w-80 mt-7 md:mb-14 md:mt-0 h-36 rounded-3xl flex items-center md:justify-start justify-center ml-10"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        <div className="ml-12 flex flex-col md:gap-6 mt-6">
          <h1 className="text-white text-2xl font-bold">Cloud Pro ✨</h1>
          <button className="bg-white w-32 h-10 rounded-lg font-medium hover:opacity-75 transition-all">
            See Plans
          </button>
        </div>

        {/* Image */}
        <div
          className="mt-10"
          style={{
            transform: "rotate(-15deg)",
            transformOrigin: "top left",
          }}
        >
          <img
            src="/assets/Data management.png"
            alt="cloud pro"
            className="md:w-[201px] md:h-[201px] "
          />
        </div>
      </div>
    </>
  );
};

export default CloudPro;
