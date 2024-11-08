import React, { useRef, useState } from "react";
import OTP from "./OTP";

const OTPinput = ({ handleCancel }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = [useRef(), useRef(), useRef(), useRef()];

  const handleInput = (i, e) => {
    if (e < "9" && e > "0") {
      setOtp((otp) => {
        let temp = [...otp];
        temp[i] = e;
        return temp;
      });
      if (i < otp.length - 1) {
        inputRef[i + 1].current.focus();
      }
    } else {
      if (e === "Backspace") {
        if (otp[i] === "") {
          if (i > 0) {
            inputRef[i - 1].current.focus();
          }
        } else {
          setOtp((otp) => {
            let temp = [...otp];
            temp[i] = "";
            return temp;
          });
        }
      }
    }
  };

  return (
    <div>
      <OTP otp={otp} inputRef={inputRef} handleInput={handleInput} handleCancel={handleCancel} />
    </div>
  );
};

export default OTPinput;
