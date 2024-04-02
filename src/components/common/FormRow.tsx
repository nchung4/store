import { FC, ReactNode } from "react";

type FormRowProps = {children: ReactNode}

const FormRow:FC<FormRowProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] lg:gap-[45px]">
      {children}
    </div>
  );
};

export default FormRow;
