import React from "react";
import { motion } from "framer-motion";

type Props = {
  activeTab: Tab;
  tabList: Tab[];
  onSelect: (tab: Tab) => void;
  border?: boolean;
  tabClass?: string;
};

const Tabs = ({
  tabList,
  activeTab,
  onSelect,
  border = false,
  tabClass = "",
}: Props) => {
  return (
    <div
      className={`overflow-x-auto ${tabClass}
        ${!border ? "" : "border-b border-gray-200"}`}
    >
      <div className="flex gap-x-6">
        {tabList.map(tab => (
          <button
            key={tab.name}
            onClick={() => onSelect(tab)}
            className={`pb-4 text-sm font-medium relative ${
              activeTab.id === tab.id
                ? "text-neutral-700"
                : "text-gray-500 hover:text-neutral-600"
            }`}
          >
            {tab.name}
            {activeTab.id === tab.id ? (
              <motion.div
                layoutId="tabs"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-neutral-700 z-10"
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
