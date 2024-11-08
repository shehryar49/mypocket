import React from "react";
import Pie from "./Pie";
import { IoIosArrowForward } from "react-icons/io";

const CurrentPlan = () => {
  return (
    <div className="mt-4 md:min-h-screen md:w-72 bg-custom-light-cyan p-2 rounded-3xl ">
      {/* Heading */}
      <h1 className="text-base font-semibold text-center">Current Plan</h1>

      {/* Users */}
      <div className="flex justify-between items-center mt-2">
        <h1 className="text-xs">Users</h1>
        <h1 className="text-xs">1/5</h1>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
        <div
          className="bg-blue-700 h-2 rounded-full"
          style={{ width: "20%" }}
        ></div>
      </div>

      {/* Request */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-xs">Requests/day</h1>
        <h1 className="text-xs">7.5k/10k</h1>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
        <div
          className="bg-red-500 h-2 rounded-full"
          style={{ width: "75%" }}
        ></div>
      </div>

      {/* Pie */}
      <div className="flex justify-center items-center mt-4 ml-4">
        <Pie />
      </div>

      {/* Projects */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-xs">Projects</h1>
        <h1 className="text-xs">1/3</h1>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
        <div
          className="bg-orange-500 h-2 rounded-full"
          style={{ width: "33%" }}
        ></div>
      </div>

      {/* Team Plan */}
      <div className="mt-12 flex hover:cursor-pointer hover:bg-blue-200 transition-all hover:rounded-lg">
        <span className="bg-white h-11 px-4 py-3 rounded-xl"></span>
        <div className="flex flex-col ml-2 gap-1">
          <h1 className="text-xs">Teams Plan</h1>
          <h1 className="text-sm font-semibold">$99/mo</h1>
        </div>
        <div className="flex items-center ml-12">
          <IoIosArrowForward />
        </div>
      </div>

      {/* Storage */}
      <div className="flex flex-col mt-12">
        <h1 className="text-lg font-extrabold flex flex-col">
          30 GB <span className="text-sm font-semibold">Total Storage</span>
        </h1>

        <h1 className="text-blue-600 mt-6 text-lg font-extrabold flex flex-col">
          3.75 GB <span className="text-sm font-semibold">12.5% Used</span>
        </h1>
      </div>

      {/* Detail Button */}
      <button className="w-36 bg-black h-14 text-white rounded-3xl mt-6 mb-4 hover:opacity-75 transition-all">
        View Detail
      </button>
    </div>
  );
};

export default CurrentPlan;
