import { useEffect, useState } from "react";
import { ProductType } from "../types";
import { api } from "../api";
import { v4 as uuidv4 } from "uuid";
import ProductCard from "../components/product/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<{ content: ProductType[] }>("/Product");
        setProducts(result.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center">
        <div className="text-2xl flex items-center justify-center w-fit relative before:content-[''] before:w-[200%] before:h-[1px] before:bg-black before:absolute">
          <p className="bg-white px-4 py-2 relative z-10">Product Feature</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {products.map((item) => (
          <ProductCard key={uuidv4()} product={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
