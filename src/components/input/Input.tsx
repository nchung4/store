import React, { FC } from "react";
import { Control, useController } from "react-hook-form";
import classNames from "../../utils/classNames";

type InputProps = {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Input: FC<InputProps> = ({
  type = "text",
  className = "",
  control,
  name,
  placeholder = "",
  children,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, defaultValue: "" });
  return (
    <div className="">
      <div className="relative">
        <input
          autoComplete="off"
          type={type}
          className={classNames(
            "text-base placeholder:text-text1 py-2 px-[25px] outline-none border border-solid w-full bg-inherit peer border-black",
          
            children ? "pr-16" : "",
            className
          )}
          placeholder={error?.message ? "" : placeholder}
          id={name}
          {...rest}
          {...field}
        />

        {children}
      </div>
      {error?.message && <p className="text-err">{error.message}</p>}
    </div>
  );
};

export default Input;
