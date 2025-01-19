import { t } from "i18next";
import React from "react";
import { ButtonPropsType } from "../Types";

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonPropsType>(
  ({ text, label, onClick, onKeyDown }, ref) => {
    return (
      <button
        aria-label={label}
        role="button"
        type="button"
        ref={ref}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className="text-white bg-[#2B2B2B] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center h-fit"
      >
        {t(text)}
      </button>
    );
  }
);

export default CustomButton;
