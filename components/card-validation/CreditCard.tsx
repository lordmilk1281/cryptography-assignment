import TextField from "@/components/form/TextField";
import React, { useEffect, useState } from "react";

type Props = {
  handleCardNumber: (value: string) => void;
};

const CreditCard = ({ handleCardNumber }: Props) => {
  const [first4, setFirst4] = useState("");
  const [second4, setSecond4] = useState("");
  const [third4, setThird4] = useState("");
  const [fourth4, setFourth4] = useState("");
  const [type, setType] = useState<CreditCardType | null>(null);

  const getCardType = (cardNumber: string) => {
    var bin = cardNumber.substring(0, 1);
    switch (bin) {
      case "3":
        if (/^3[47]/.test(cardNumber)) {
          return {
            name: "American Express",
            image: "http://",
          };
        }
        break;
      case "4":
        if (/^4/.test(cardNumber)) {
          return {
            name: "Visa",
            image: "http://",
          };
        }
        break;
      case "5":
        if (/^5[1-5]/.test(cardNumber)) {
          return {
            name: "Mastercard",
            image: "http://",
          };
        }
        break;
    }
    return null;
  };

  useEffect(() => {
    if (first4 || second4 || third4 || fourth4) {
      const number = `${first4}${second4}${third4}${fourth4}`;
      handleCardNumber(number);
      setType(getCardType(number));
    }
  }, [first4, second4, third4, fourth4]);

  return (
    <div className="flex flex-col gap-y-1.5 shadow-md p-4 ring-1 ring-gray-100 rounded-lg max-w-sm">
      <label className="text-gray-700 text-sm font-semibold">
        Credit Card Number
      </label>
      <div className="flex gap-x-1">
        <TextField
          type="text"
          pattern="/d*"
          maxLength={4}
          value={first4}
          onChange={setFirst4}
          className="w-full text-center font-medium"
          placeholder="0000"
        />
        <TextField
          type="text"
          pattern="/d*"
          maxLength={4}
          value={second4}
          onChange={setSecond4}
          className="w-full text-center font-medium"
          placeholder="0000"
        />
        <TextField
          type="text"
          pattern="/d*"
          maxLength={4}
          value={third4}
          onChange={setThird4}
          className="w-full text-center font-medium"
          placeholder="0000"
        />
        <TextField
          type="text"
          pattern="/d*"
          maxLength={4}
          value={fourth4}
          onChange={setFourth4}
          className="w-full text-center font-medium"
          placeholder="0000"
        />
      </div>
    </div>
  );
};

export default CreditCard;
