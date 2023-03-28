import ConfirmButton from "@/components/form/ConfirmButton";
import HelperLayout from "@/components/layout/HelperLayout";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CreditCard from "@/components/card-validation/CreditCard";

type Props = {};

const CardValidation = (props: Props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const validateCreditCard = () => {
    let replacedNumber = cardNumber.replace(/\D/g, "");

    if (
      !/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/.test(
        replacedNumber
      )
    ) {
      return false;
    }

    var sum = 0;
    for (var i = 0; i < 16; i++) {
      var digit = parseInt(replacedNumber[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  return (
    <HelperLayout>
      <div className="flex justify-center">
        <div className="space-y-6">
          <CreditCard
            handleCardNumber={value => {
              setShowValidation(false);
              setCardNumber(value);
            }}
          />
          <ConfirmButton
            label="Validate Card"
            className="w-full"
            onClick={() => setShowValidation(true)}
          />
          <AnimatePresence>
            {showValidation ? (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="flex items-center justify-between gap-y-1.5 shadow-md p-4 ring-1 ring-gray-100 rounded-lg max-w-sm"
              >
                <p className="text-sm text-gray-900">
                  {validateCreditCard()
                    ? "This is a valid credit card."
                    : "This is an invalid credit card."}
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

export default CardValidation;
