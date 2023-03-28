import Link from "next/link";
import React from "react";
import HelperLayout from "./HelperLayout";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Props = {};

const navItems = [
  {
    name: "Credit Card Validation",
    link: "/card-validation",
  },
  {
    name: "Hamming Code",
    link: "/hamming-code",
  },
  {
    name: "Brute Force Password Cracking",
    link: "/brute-force-password",
  },
  {
    name: "Steganography",
    link: "/steganography",
  },
];

const NavBar = (props: Props) => {
  let pathname = usePathname() || "/";
  return (
    <div className="bg-gray-100">
      <HelperLayout>
        <div className="flex gap-x-4 items-center justify-center">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.link}
              className={`inline-flex items-center border-b-2 border-transparent px-3 py-2 my-1 rounded-md text-sm font-medium transition-colors ${
                pathname === item.link
                  ? "text-white relative z-10"
                  : "hover:bg-gray-300 hover:text-gray-700 text-gray-500"
              }`}
            >
              {item.name}
              {pathname === item.link ? (
                <motion.div
                  layoutId="navbar"
                  className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1]"
                />
              ) : null}
            </Link>
          ))}
        </div>
      </HelperLayout>
    </div>
  );
};

export default NavBar;
