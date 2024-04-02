import _ from "lodash";
import { ChangeEvent, useState } from "react";
import { api } from "../api";
import { ProductType } from "../types";
import { v4 as uuidv4 } from "uuid";
import ProductCard from "../components/product/ProductCard";
import classNames from "../utils/classNames";

const SearchProductPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);
  console.log("sort - ", sort);
  const listProdyctsSort = sort
    ? _.orderBy(products, ["price"], [sort])
    : products;
  const fetchData = async (value: string) => {
    try {
        const result = await api.get<{ content: ProductType[] }>(
          `/Product?keyword=${value}`
        );
        setProducts(result.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedInputChange = _.debounce((value: string) => {
    console.log(value);
    fetchData(value);
  }, 1000);

  const handleInputDebouncedChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    debouncedInputChange(value); // Gọi hàm debounce với giá trị hiện tại của input
  };
  return (
    <div className="space-y-10">
      <div className="flex items-center w-1/2 gap-5">
        <div className="relative">
          <input
            type="text"
            className="text-base placeholder:text-text1 py-2 px-[25px] outline-none border border-solid w-full bg-inherit peer border-black  "
            value={inputValue}
            onChange={handleInputDebouncedChange}
            placeholder="Search Product Name..."
          />
          {inputValue.length > 0 && (
            <span
              className="absolute -translate-y-1/2 cursor-pointer right-4 top-1/2"
              onClick={() => {
                setInputValue("");
                fetchData(inputValue);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 h-4 fill-gray-400"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
            </span>
          )}
        </div>

        <button
          className="text-white bg-black px-4 py-2"
          onClick={() => fetchData(inputValue)}
        >
          Search
        </button>
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() =>
          setSort((prev) =>
            prev === "asc" ? "desc" : prev === "desc" ? undefined : "asc"
          )
        }
      >
        <p>Sort Price</p>
        <div className="flex flex-col grow-0 shrink-0 items-center justify-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className={classNames(
                "w-4 h-4",
                sort === "asc" ? "fill-black" : "fill-gray-400"
              )}
            >
              <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className={classNames(
                "w-4 h-4",
                sort === "desc" ? "fill-black" : "fill-gray-400"
              )}
            >
              <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {listProdyctsSort.map((item) => (
          <ProductCard key={uuidv4()} product={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchProductPage;
