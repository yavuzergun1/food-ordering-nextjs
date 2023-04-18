import React from "react";

function Loading() {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
      </div>
    </div>
  );
}

export default Loading;
