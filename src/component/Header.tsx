import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Elearn</h1>
      <div className="flex items-center">
        <button className="p-2 bg-gray-200 rounded-full">🔔</button>
      </div>
    </header>
  );
};

export default Header;
