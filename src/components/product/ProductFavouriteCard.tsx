import { FC, useEffect, useState } from "react";
import { ProductType } from "../../types";
import { Link } from "react-router-dom";
import FavouriteIcon from "../common/FavouriteIcon";
import { api } from "../../api";

type ProductCardProps = { productId: number };
const ProductFavouriteCard: FC<ProductCardProps> = ({ productId }) => {
  const [product, setProduct] = useState<ProductType>();
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<{ content: ProductType }>(
          `/Product/getbyid?id=${productId}`
        );
        setProduct(result.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [productId]);
  if (product)
    return (
      <div className="space-y-3 border border-black select-none">
        <div className="px-5 pt-10 pb-5 relative">
          <div className="absolute top-5 right-5">
            <FavouriteIcon productId={product.id} />
          </div>
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              className="w-full aspect-video object-cover"
            />
          </Link>
        </div>
        <Link to={`/product/${product.id}`} className="px-5 block">
          <p className="line-clamp-1 capitalize">{product.name}</p>
          <p className="line-clamp-2 text-gray1 text-sm">
            {product.shortDescription}
          </p>
        </Link>
        <div className="flex items-center border-t border-t-black">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 border-r border-r-black py-3 uppercase flex items-center justify-center bg-black text-white"
          >
            buy now
          </Link>
          <div className="flex-1 flex items-center justify-center">
            {product.price}$
          </div>
        </div>
      </div>
    );
  return;
};

export default ProductFavouriteCard;
