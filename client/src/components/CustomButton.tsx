import { t } from "i18next";
import React from "react";
import { ButtonPropsType } from "../Types";

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonPropsType>(
  ({ text, label, onClick }, ref) => {
    return (
      <button
        aria-label={label}
        role="button"
        type="button"
        ref={ref}
        onClick={onClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-fit"
      >
        {t(text)}
      </button>
    );
  }
);

export default CustomButton;
