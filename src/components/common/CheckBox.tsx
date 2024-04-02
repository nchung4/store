import React, { FC } from "react";
import classNames from "../../utils/classNames";
import { Control, useController } from "react-hook-form";

type RadioType = {
  children?: React.ReactNode;
  control: Control<any>;
  name: string;
  value?: string;
  htmlFor: string;
  defaulChecked?: boolean;
};
const Radio: FC<RadioType> = ({
  children,
  control,
  name,
  value,
  htmlFor,
  defaulChecked = false,
}) => {
  const { field } = useController({ control, name});
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor={htmlFor}
        className={classNames(
          "w-4 h-4 border-2 flex items-center justify-center transition-all duration-75 cursor-pointer bg-transparent border-black "
        )}
      >
        <input
          {...field}
          type="radio"
          className="hidden peer"
          id={htmlFor}
          value={value}
          defaultChecked={defaulChecked}
        />
        <span className="text-white peer-checked:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            stroke="currentColor"
            className={classNames("w-[10px] h-[10px] fill-current")}
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        </span>
      </label>
      {children && (
        <div className="flex-1 cursor-pointer select-none">{children}</div>
      )}
    </div>
  );
};

export default Radio;
