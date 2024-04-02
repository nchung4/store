import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { ProductDetailType } from "../types";
import { v4 as uuidv4 } from "uuid";
import Quantity from "../components/common/Quantity";
import ProductCard from "../components/product/ProductCard";
import FavouriteIcon from "../components/common/FavouriteIcon";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store/cart/cartSlice";
import { RootState } from "../store/configureStore";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailType>();
  const [qty, setQty] = useState<number>(1);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<{ content: ProductDetailType }>(
          `/Product/getbyid?id=${productId}`
        );
        setProduct(result.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [productId]);
  if (product) {
    const {
      id,
      name,
      description,
      quantity,
      size,
      relatedProducts,
      price,
      image,
    } = product;
    return (
      <div className="grid grid-cols-10 gap-20">
        <div className="col-span-4">
          <div className="border border-black p-16">
            <img src={image} className="w-full aspect-square object-cover" />
          </div>
        </div>
        <div className="col-span-6 w-3/4">
          <h2 className="capitalize text-2xl mb-3">{name}</h2>
          <p className="text-xl">{price}$</p>
          <div className="space-y-3 py-3">
            <p className="capitalize text-lg font-medium">avaiable size</p>
            <div className="flex items-center gap-3">
              {size.map((item) => (
                <button
                  key={uuidv4()}
                  className="px-3 py-1 border border-black"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-stretch gap-5 py-3">
            <Quantity
              value={qty}
              onIncrease={() => qty < quantity && setQty((prev) => prev + 1)}
              onReduced={() => qty > 1 && setQty((prev) => prev - 1)}
            />
            <button
              className="bg-black text-white px-5 py-2 capitalize"
              onClick={() => {
                if (auth) {
                  dispatch(addCart({ product, qty }));
                } else {
                  navigate("/login");
                }
              }}
            >
              Add to card
            </button>
            <div className="flex items-center justify-center">
              <FavouriteIcon productId={id} />
            </div>
          </div>
          <p>{description}</p>
        </div>
        <div className="col-span-10 pt-20 space-y-10">
          <div className="flex items-center justify-center">
            <div className="text-2xl flex items-center justify-center w-fit relative before:content-[''] before:w-[200%] before:h-[1px] before:bg-black before:absolute">
              <p className="bg-white px-4 py-2 relative z-10">
                Realate Product
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-10">
            {relatedProducts.map((item) => (
              <ProductCard key={uuidv4()} product={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return;
};

export default ProductDetail;
