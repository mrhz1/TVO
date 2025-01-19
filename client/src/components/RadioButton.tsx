import { t } from "i18next";
import React from "react";
import { RadioButtonPropsType } from "../Types";



const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonPropsType>(
  ({ label, items, onChange }, ref) => {
    return (
      <fieldset className="mb-6">
        <legend className="block mb-2 text-sm font-medium text-gray-900">
          {t(label)}
        </legend>
        <div className="flex">
          {items.map((item, index) => (
            <div className="flex items-center me-4" key={index}>
              <input
                id={item.id}
                type="radio"
                value={item.value}
                checked={item.checked}
                onChange={onChange}
                ref={ref}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                aria-labelledby={item.id}
              />
              <label htmlFor={item.id} className="ms-2 text-sm font-medium">
                {t(item.value)}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    );
  }
);

export default RadioButton;
