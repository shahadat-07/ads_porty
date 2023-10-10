import React from "react";
interface TextProps {
  label: string;
  value: string;
}

const Text: React.FC<TextProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between border py-2 px-4 rounded-lg hover:shadow-lg hover:cursor-pointer animation duration-200">
      <div className="flex-1">
        <p className="text-base md:text-lg ">
          {`${label}:`} 
        </p>
      </div>
      <div className="flex-2">
        <p className="text-base md:text-lg rounded-lg hover:cursor-pointer animation duration-200">
         <span className="font-semibold">{`$ ${value}`}</span>
        </p>
      </div>
    </div>
  );
};

export default Text;
