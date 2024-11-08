import React from "react";

const Pie = () => {
  return (
    <svg
      width="169"
      height="157"
      viewBox="0 0 169 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ellipse (Circle) */}
      <ellipse cx="77.5" cy="82" rx="77.5" ry="75" fill="#79D2FF" />

      {/* Triangle Slice */}
      <g filter="url(#filter0_d_0_1)">
        <path
          d="M77 7C98.7542 7 119.617 14.9018 135 28.967L77 82V7Z"
          fill="#0047FF"
        />
      </g>

      {/* Filter Definitions */}
      <defs>
        <filter
          id="filter0_d_0_1"
          x="63"
          y="0"
          width="106"
          height="123"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="10" dy="17" />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.188235 0 0 0 0 0.243137 0 0 0 0 0.717647 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Pie;
