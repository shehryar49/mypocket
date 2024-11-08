import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
