import React from "react";
// import { Link, animateScroll as scroll } from "react-scroll";

import Link from "next/link";

interface NavLinkProps {
  url: string;
  text: string;
  targetId?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ url, text, targetId, onClick }) => {
  if (!targetId) {
    return (
      <Link
        href={url}
        className="hover:bg-gray-700 font-semibold hover:cursor-pointer hover:text-white text-black block px-3 py-2 rounded-md text-base"
        onClick={onClick}
      >
        {text}
      </Link>
    );
  } else {
    const handleClick = (e: React.MouseEvent) => {
      if (targetId) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    return (
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="hover:bg-gray-700 font-semibold hover:cursor-pointer hover:text-white text-black block px-3 py-2 rounded-md text-base"
      >
        {text}
      </a>
    );
  }
};

export default NavLink;

// "use client";

// import React from "react";
// import Link from "next/link";

// interface NavLinkProps {
//   url: string;
//   text: string;
//   targetId?: string;
//   onClick?: () => void;
// }

// const NavLink: React.FC<NavLinkProps> = ({ url, text, targetId }) => {
//   const handleClick = (e: React.MouseEvent) => {
//     if (targetId) {
//       e.preventDefault();
//       const element = document.getElementById(targetId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   if (targetId) {
//     return (
//       <a
//         href={`#${targetId}`} // Use a "#" followed by the target ID as the href
//         onClick={handleClick}
//         className="hover:bg-gray-700 font-semibold hover:cursor-pointer hover:text-white text-black block px-3 py-2 rounded-md text-base"
//       >
//         {text}
//       </a>
//     );
//   } else {
//     return (
//           <Link
//             href={url}
//             className="hover:bg-gray-700 font-semibold hover:cursor-pointer hover:text-white text-black block px-3 py-2 rounded-md text-base"
//             onClick={onClick}
//           >
//             {text}
//           </Link>
//         );
//   }
// }

// export default NavLink;
