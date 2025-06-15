import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Contacts App</h1>
      <div className="space-y-4">
        <p className="text-lg">
          This is a simple contacts management application where you can:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Create and manage your contacts</li>
          <li>Organize contacts into groups</li>
          <li>Search and filter your contacts</li>
          <li>Manage your profile</li>
        </ul>
        <div className="mt-8 space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
