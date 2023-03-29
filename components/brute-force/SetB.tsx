import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ConfirmButton from "../form/ConfirmButton";
import TextField from "../form/TextField";

type Props = {};

const SetB = (props: Props) => {
  const [password, setPassword] = useState("");
  const [rawWordLength, setRawWordLength] = useState("");
  const [rawMaxWords, setRawMaxWords] = useState("");
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const bruteForce = (dictionary: string[]) => {
    setFound(dictionary.includes(password));
    setLoading(false);
    setShowValidation(true);
  };

  const generateWord = () => {
    const maxLength = parseInt(rawWordLength);
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < maxLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const generateWords = () => {
    const words: string[] = [];
    const maxWords = parseInt(rawMaxWords);
    for (let i = 0; i < maxWords; i++) {
      const word = generateWord();
      words.push(word);
    }
    bruteForce(words);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-y-1.5">
        <label className="text-sm font-medium text-gray-900">Password</label>
        <TextField
          bordered
          pattern="/d*"
          value={password}
          placeholder="Password"
          onChange={value => {
            setPassword(value);
            setShowValidation(false);
          }}
        />
      </div>
      <div className="flex gap-x-4">
        <div className="flex flex-col gap-y-1.5">
          <label className="text-sm font-medium text-gray-900">
            Word Length
          </label>
          <TextField
            bordered
            pattern="/d*"
            value={rawWordLength}
            placeholder="0"
            onChange={setRawWordLength}
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label className="text-sm font-medium text-gray-900">
            Max number of words
          </label>
          <TextField
            bordered
            pattern="/d*"
            value={rawMaxWords}
            placeholder="0"
            onChange={setRawMaxWords}
          />
        </div>
      </div>
      <ConfirmButton
        label="Brute Force"
        className="w-full"
        onClick={generateWords}
      />
      <AnimatePresence>
        {showValidation && password ? (
          <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex items-center justify-between gap-y-1.5 shadow-md p-4 ring-1 ring-gray-100 rounded-lg"
          >
            <p className="text-sm text-gray-900">
              {found
                ? `Dictionary contains the word "${password}"`
                : `Dictionary does not contain the word "${password}"`}
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

export default SetB;
