import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathname = usePathname() || "/";

  return (
    <div>
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="mt-6"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

const variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default Layout;
