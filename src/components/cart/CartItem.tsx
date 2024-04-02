import { FC, useState } from "react";
import { ProductDetailType } from "../../types";
import { Link } from "react-router-dom";
import Quantity from "../common/Quantity";
import { useDispatch } from "react-redux";
import { changeQtyCart, removeCart } from "../../store/cart/cartSlice";

type CartItemProps = { cart: { qty: number; product: ProductDetailType } };
const CartItem: FC<CartItemProps> = ({ cart }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState<number>(cart.qty);
  const {
    product: { id, name, image, price, quantity },
  } = cart;

  const handleRemoveCart = () => dispatch(removeCart(id));
  const handleIncrease = () => {
    if (qty < quantity) {
      setQty((prev) => prev + 1);
      dispatch(changeQtyCart({ qty: qty + 1, productId: id }));
    }
  };
  const handleReduced = () => {
    setQty((prev) => prev - 1);
    dispatch(changeQtyCart({ qty: qty - 1, productId: id }));
  };
  return (
    <div className="flex items-center py-2">
      <div className="flex-1 px-2">
        <Link to={`/product/${id}`}>
          <img src={image} className="w-16 aspect-square object-cover" />
        </Link>
      </div>
      <div className="flex-1 px-2">
        <Link to={`/product/${id}`}>{name}</Link>
      </div>
      <div className="flex-1 px-2">{price}$</div>
      <div className="flex-1 px-2">
        <Quantity
          value={qty}
          onIncrease={handleIncrease}
          onReduced={handleReduced}
        ></Quantity>
      </div>
      <div className="flex-1 px-2">{price * qty}$</div>
      <div className="flex-1 px-2">
        <button
          className="px-4 py-2 bg-black text-white"
          onClick={handleRemoveCart}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
