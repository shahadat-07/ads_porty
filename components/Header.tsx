import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/images/Earn Into Logo.png"

interface HeaderProps {
    heading: string;
    paragraph: string;
    linkName: string;
    linkUrl: string
}

 const Header:React.FC<HeaderProps> = ({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}) => {
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <Image
                    className="-mt-10 md:-mt-20 h-[180px] w-[180px] md:h-[250px] md:w-[250px]"
                    src={Logo}
                    alt="Logo"
                    />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 -mt-12 md:-mt-20">
                {heading}
            </h2>
            <p className="text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link href={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}

export default Header