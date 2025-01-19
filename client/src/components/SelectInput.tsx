import React from "react";
import { SelectPropsType } from "../Types";
import { t } from "i18next";

const SelectInput = React.forwardRef<HTMLSelectElement, SelectPropsType>(
  ({ id, placeHolder, label, value, items, onChange }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t(label)}
        </label>
        <select
          onChange={onChange}
          ref={ref}
          value={value}
          id={id}
          aria-label={placeHolder}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {items.map((item, index) => (
            <option key={index} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectInput;
