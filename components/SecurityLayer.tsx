"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";
import Loader from "./Loader";

interface SecurityLayoutProps {
  children: React.ReactNode;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userIsLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("jwt");

    if (token) {
      setTimeout(() => {
        setUserLoggedIn(true);
      }, 1000);
    } else {
      setUserLoggedIn(false);
    }
    // if (userIsLoggedIn === true && pathname === "/login") {
    //   router.push("/");
    // }
  }, [router, pathname, userIsLoggedIn]);

  if (userIsLoggedIn === null) {
    return <Loader />;
  }

  return <div>{children}</div>;
};

export default SecurityLayout;
