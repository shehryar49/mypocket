import React from "react";
import Routing from "./Components/Routes/Routing";
import AuthProvider from "./Components/Context/AuthContext";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routing />
        <Toaster position="top-right"richColors expand={true}/>
      </AuthProvider>
    </>
  );
};

export default App;
