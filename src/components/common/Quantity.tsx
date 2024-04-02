import { FC } from "react";

type QuantityProps = {
  value: number;
  onIncrease: () => void; //tăng
  onReduced: () => void;
};
const Quantity: FC<QuantityProps> = ({ value, onIncrease, onReduced }) => {
  return (
    <div className="flex items-center border border-black select-none cursor-pointer w-fit">
      <div className="p-2" onClick={onReduced}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </div>
      <div className="w-9 flex items-center justify-center">{value}</div>
      <div className="p-2" onClick={onIncrease}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
};

export default Quantity;
