import ConfirmButton from "@/components/form/ConfirmButton";
import TextField from "@/components/form/TextField";
import HelperLayout from "@/components/layout/HelperLayout";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type Props = {};

const HammingCode = (props: Props) => {
  const [bitCode, setBitCode] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const validateCodeword = () => {
    const codeword = bitCode.split("").map(code => parseInt(code));
    return !codeword.every(bit => bit === 0 || bit === 1) ? true : false;
  };

  const detectAndCorrectError = () => {
    const codeword = bitCode.split("").map(code => parseInt(code));
    const p1 = codeword[0] ^ codeword[1] ^ codeword[3] ^ codeword[4];
    const p2 = codeword[1] ^ codeword[2] ^ codeword[4] ^ codeword[5];
    const p3 = codeword[0] ^ codeword[2] ^ codeword[4] ^ codeword[6];
    const syndrome = p1 + (p2 << 1) + (p3 << 2);

    if (syndrome !== 0) {
      codeword[syndrome - 1] ^= 1;
    }

    return codeword;
  };

  return (
    <HelperLayout>
      <div className="flex justify-center">
        <div className="space-y-6">
          <div className="shadow-md p-4 ring-1 ring-gray-100 rounded-lg max-w-sm flex flex-col gap-y-1.5">
            <label className="text-sm text-gray-900 font-semibold">7 bit</label>
            <TextField
              bordered
              maxLength={7}
              value={bitCode}
              placeholder="0000000"
              pattern="/d*"
              onChange={value => {
                setShowValidation(false);
                setBitCode(value);
              }}
            />
          </div>
          <ConfirmButton
            label="Detect Error"
            className="w-full"
            onClick={() => setShowValidation(true)}
          />
          <AnimatePresence>
            {showValidation && bitCode ? (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="flex items-center justify-between gap-y-1.5 shadow-md p-4 ring-1 ring-gray-100 rounded-lg max-w-sm"
              >
                <p className="text-sm text-gray-900">
                  {validateCodeword()
                    ? "Must contain only 1's and 0's"
                    : detectAndCorrectError()}
                </p>
                <button onClick={() => setShowValidation(false)}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </HelperLayout>
  );
};

export default HammingCode;
