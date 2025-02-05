import React from "react";
import { TextInputPropsType } from "../Types";
import { t } from "i18next";

const TextInput = React.forwardRef<HTMLInputElement, TextInputPropsType>(
  ({ id, placeHolder, label }, ref) => {
    return (
      <div className="">
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t(label)}
        </label>
        <input
          ref={ref}
          type="text"
          id={id}
          className="border border-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeHolder}
          required
          aria-required="true"
        />
      </div>
    );
  }
);

export default TextInput;
