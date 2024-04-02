import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CartItem from "../components/cart/CartItem";
import { api } from "../api";
import { resetCart } from "../store/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state: RootState) => state.auth);
  const carts = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);
  const handleSubmitOrder = async () => {
    try {
      if (auth) {
        api.post("/Users/order", {
          orderDetail: carts.map((item) => ({
            productId: item.product.id,
            quantity: item.qty,
          })),
          email: auth.email,
        });
        dispatch(resetCart());
        navigate("/account");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (auth)
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center">
          <div className="text-2xl flex items-center justify-center w-fit relative before:content-[''] before:w-[200%] before:h-[1px] before:bg-black before:absolute">
            <p className="bg-white px-4 py-2 relative z-10">Cart</p>
          </div>
        </div>
        {carts.length > 0 ? (
          <div>
            <div className="flex items-center border border-black py-2">
              <div className="flex-1 px-2 font-medium">Image</div>
              <div className="flex-1 px-2 font-medium">Product Name</div>
              <div className="flex-1 px-2 font-medium">Price</div>
              <div className="flex-1 px-2 font-medium">Quantity</div>
              <div className="flex-1 px-2 font-medium">Total</div>
              <div className="flex-1 px-2 font-medium">Action</div>
            </div>
            {carts.map((item) => (
              <CartItem cart={item} key={uuidv4()} />
            ))}
            <div className="flex justify-end mt-10">
              <button
                className="px-4 py-2 bg-black text-white"
                onClick={handleSubmitOrder}
              >
                Submit Order
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">There are no products in the cart yet</p>
        )}
      </div>
    );
  return;
};

export default CartPage;
