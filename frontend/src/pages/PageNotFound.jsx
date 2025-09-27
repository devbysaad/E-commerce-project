import React from 'react'
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-9xl font-bold text-amber-400">404</h1>
      <h2 className="text-3xl mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 text-lg">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-amber-400 text-black rounded-lg hover:bg-amber-500 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound