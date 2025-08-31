import React, { useState } from "react";

const ExpandingDiv = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex  h-screen bg-gray-100 w-1/4">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="ml-4 w-fit h-fit px-4 py-2 bg-blue-600 text-white rounded"
      >
        Toggle
      </button>

      {/* Animated Div */}
      <div
        className={`ml-2 bg-purple-500 text-white flex items-center justify-center rounded-lg origin-left transition-all duration-700 ease-in-out
        ${open ? "w-full h-screen opacity-100 scale-100" : "w-0 h-0 opacity-0 scale-0"}`}
      >
        {open && <p className="p-4">Hello, I expanded!</p>}
      </div>
    </div>
  );
};

export default ExpandingDiv;
