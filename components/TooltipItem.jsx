import React from "react";

const TooltipItem = ({ children, tooltipsText }) => {
  return (
    <div className=" px-4 sm:w-1/2 lg:w-1/4">
      <div class="mb-4">
        <div className="group relative inline-block">
          <button className="bg-primary inline-flex rounded py-2 px-[18px] text-[10px] font-semibold text-red-500">
            {children}
          </button>
          <div className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 rounded border bg-white py-[6px] px-4 text-[10px] opacity-0 group-hover:opacity-100">
            <span className="border-light absolute -bottom-1 left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-l-sm border-b border-r bg-white"></span>
            {tooltipsText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipItem;
