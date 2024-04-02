import { FC, ReactNode } from "react";
import classNames from "../../utils/classNames";

type FormGroupProps = { children: ReactNode, className?:string };

const FormGroup: FC<FormGroupProps> = ({ children, className = '' }) => {
  return <div className={classNames("flex flex-col gap-[10px]", className)}>{children}</div>;
};
export default FormGroup;
