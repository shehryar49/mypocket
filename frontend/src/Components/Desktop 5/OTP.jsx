import {React,useContext} from "react";
import ConfirmationButtons from "./ConfirmationButtons";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../Context/AuthContext';
import {toast} from "sonner";

const API_URL = "http://localhost:8000";

const OTP = () => {
  const navigate = useNavigate();
  const { login,tmp,setTmp } = useContext(AuthContext);
  const handleChange = (e) => {
    // Dummy function for input field
    console.log(tmp);
    if(e.target.value.length == 4) {
      const payload = {email: tmp.email,password: tmp.password,otp: parseInt(e.target.value)};
      const token = localStorage.getItem('token');
      const config = {headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},"body": JSON.stringify(payload),method: "POST"};
      fetch(API_URL+"/otpsignin",config).then((response) => {
        return response.json();
      }).then((response) => {
        if('msg' in  response)
          throw new Error(response.msg);
        const access_token = response.access_token;
        login(access_token,{'name': response.name,'email': response.email,'id': response.id,'active_sessions': response['active_sessions']}); 
        navigate("/dashboard");
      }).catch((err) => {
        toast.error(err.message);
        navigate("/signin");
      });
    }
  };
  const handleCancel = () => {
    navigate("/signin");
  };
  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,700;1,700&display=swap");
        `}
      </style>
      <div
        className="relative dark:bg-gray-900 flex flex-col min-h-screen"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-bold text-lg dark:text-gray-200">
            Enter 4 digit code
          </h1>

          <div
            className="border border-gray-200 dark:bg-gray-800 dark:border-gray-800 w-[343px] h-[298px] p-2 flex justify-center mt-4 rounded-lg flex-col items-center"
            style={{
              boxShadow:
                "-4px 0 10px rgba(0, 0, 0, 0.1), 4px 0 10px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.1), 0 -2px 0 rgba(255, 255, 255, 0)",
            }}
          >
            <p className="text-sm p-4 font-light dark:text-gray-300">
              A four digit code should have come to your email address that you
              indicated.
            </p>

            {/* Input fields for OTP */}
            <div className="flex gap-8 mt-2 mb-2">
              {/*otp.map((value, index) => (*/}
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="w-12 h-20 focus:bg-blue-100 text-center border bg-gray-100 border-gray-200 rounded-md shadow-md text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:focus:bg-gray-700 dark:placeholder:text-gray-400 dark:border-gray-600 dark:text-gray-200 dark:focus:border-blue-400 transition-all"
                  maxLength="4"
                />
              {/*))}*/}
            </div>

            {/* Confirmation Buttons */}
            <ConfirmationButtons handleCancel={handleCancel} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
