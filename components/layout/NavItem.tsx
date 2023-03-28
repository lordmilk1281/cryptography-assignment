import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  name: string;
  link: string;
  isChild?: boolean;
};

const NavItem = ({ name, link, isChild = false }: Props) => {
  let pathname = usePathname() || "/";
  return (
    <Link
      href={link}
      className={`w-full text-center border-b-2 border-transparent px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === link
          ? "text-white relative z-10"
          : "hover:bg-gray-300 hover:text-gray-700 text-gray-500"
      }`}
    >
      {name}
      {pathname === link ? (
        <motion.div
          layoutId="sidebar"
          className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1]"
        />
      ) : null}
    </Link>
  );
};

export default NavItem;
