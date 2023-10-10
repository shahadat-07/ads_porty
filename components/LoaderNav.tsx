'use client';

import { PuffLoader } from "react-spinners";

const LoaderNav = () => {
  return ( 
    <div
    className="ml-[400px]">
      <PuffLoader
        size={45}
        color="red"
      />
    </div>
   );
}
 
export default LoaderNav;