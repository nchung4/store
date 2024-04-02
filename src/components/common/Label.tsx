import { FC, ReactNode } from "react";
import classNames from "../../utils/classNames";

type LabelProps = { children: ReactNode; htmlFor?: string; className?: string };
const Label: FC<LabelProps> = ({ children, htmlFor = "", className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "text-base capitalize",
        className
      )}
    >
      {children}
    </label>
  );
};

export default Label;
