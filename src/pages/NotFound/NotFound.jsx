import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="404 Not Found"
        className="w-64 md:w-80"
      />
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mt-4 animate-pulse">
        404 - Not Found
      </h1>
      <p className="text-gray-600 text-lg md:text-xl mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
