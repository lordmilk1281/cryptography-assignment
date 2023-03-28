import SetA from "@/components/brute-force/SetA";
import SetB from "@/components/brute-force/SetB";
import Tabs from "@/components/globals/Tab";
import HelperLayout from "@/components/layout/HelperLayout";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type Props = {};

const tabs = [
  {
    name: "Set A",
    id: "set-a",
    component: <SetA />,
  },
  {
    name: "Set B",
    id: "set-b",
    component: <SetB />,
  },
];

const BruteForcePassword = (props: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <HelperLayout>
      <div className="flex flex-col items-center gap-y-6">
        <Tabs activeTab={activeTab} onSelect={setActiveTab} tabList={tabs} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen max-w-lg"
          >
            {activeTab.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </HelperLayout>
  );
};

export default BruteForcePassword;
