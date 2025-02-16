import React from "react";

const LeftNavBar: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-blue-900 text-white p-6 fixed">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul>
        <li className="mb-4 p-3 hover:bg-blue-700 rounded cursor-pointer">Dashboard</li>
        <li className="mb-4 p-3 hover:bg-blue-700 rounded cursor-pointer">Courses</li>
        <li className="mb-4 p-3 hover:bg-blue-700 rounded cursor-pointer">Quizzes</li>
        <li className="mb-4 p-3 hover:bg-blue-700 rounded cursor-pointer">Settings</li>
      </ul>
    </nav>
  );
};

export default LeftNavBar;
