import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ConfirmButton from "../form/ConfirmButton";
import ImportedFile from "../form/ImportedFile";
import TextField from "../form/TextField";
import UploadFile from "../form/UploadFile";

type Props = {};

const SetA = (props: Props) => {
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [found, setFound] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [dictionary, setDictionary] = useState<string[]>([]);

  const handleFile = (rawFile: File) => {
    setFile(rawFile);
    const reader = new FileReader();

    reader.onload = event => {
      const contents = event.target?.result as string;
      const array = contents.split("\r\n");
      setDictionary(array);
    };

    reader.readAsText(rawFile);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
    setFound(dictionary.includes(value));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-y-1.5">
        <label className="text-sm font-medium text-gray-900">Password</label>
        <TextField
          bordered
          pattern="/d*"
          maxLength={6}
          value={password}
          placeholder="Password"
          onChange={handlePassword}
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-900">File</label>
        {file ? (
          <ImportedFile file={file} onDelete={() => setFile(null)} />
        ) : (
          <UploadFile file={file} onInput={handleFile} />
        )}
      </div>
      <ConfirmButton
        label="Brute Force"
        className="w-full"
        onClick={() => setShowValidation(true)}
      />
      <AnimatePresence>
        {showValidation && file && password ? (
          <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex items-center justify-between gap-y-1.5 shadow-md p-4 ring-1 ring-gray-100 rounded-lg"
          >
            <p className="text-sm text-gray-900">
              {found
                ? `File contains the word "${password}"`
                : `File does not contain the word "${password}"`}
            </p>
            <button onClick={() => setShowValidation(false)}>
              <XMarkIcon className="w-4 h-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default SetA;
