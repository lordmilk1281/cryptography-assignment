import { DocumentIcon, TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import React from "react";

type Props = {
  file: File;
  onDelete: () => void;
};
const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const ImportedFile = ({ file, onDelete }: Props) => {
  function niceBytes(byte: number) {
    let l = 0,
      n = byte || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
  }

  return (
    <div className="flex justify-between items-center py-3 px-4 rounded-lg border border-gray-200">
      <div className="flex gap-x-3 items-center">
        <DocumentIcon className="w-4 h-4" />
        <div className="text-sm">
          <p className="font-medium text-gray-700 truncate">{file.name}</p>
          <p className="text-gray-500 truncate">
            {niceBytes(file.size)} - {moment(new Date()).format("ll")}
          </p>
        </div>
      </div>
      <button onClick={onDelete}>
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ImportedFile;
