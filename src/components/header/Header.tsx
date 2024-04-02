import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import { setAuth } from "../../store/auth/authSlice";
import { resetCart } from "../../store/cart/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);
  const handleSignOut = () => {
    dispatch(resetCart());
    dispatch(setAuth({ auth: undefined }));
    navigate("/login");
  };
  return (
    <div className="">
      <div className="py-3 bg-black text-white">
        <div className="flex items-center justify-between w-container">
          <Link to={"/"} className="uppercase font-medium text-lg">
            Shoes store
          </Link>
          <div className="flex items-center gap-7">
            <Link to={"/search"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </Link>
            <Link to={"/cart"} className="flex items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </span>
              {cart.length > 0 && (
                <span>
                  ({cart.reduce((total, cur) => (total += cur.qty), 0)})
                </span>
              )}
            </Link>

            {auth ? (
              <>
                <Link to={"/account"}>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1705091308837-a62710023dd4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-8 h-8 object-cover rounded-full"
                  />
                </Link>

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-white cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                  </svg>
                </span>
              </>
            ) : (
              <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 px-5 py-3 text-lg w-container">
        <Link to={"/"} className="font-medium underline underline-offset-4">
          Home
        </Link>
        <Link to={"/"}>Men</Link>
        <Link to={"/"}>Woment</Link>
        <Link to={"/"}>Kid</Link>
        <Link to={"/"}>Sport</Link>
      </div>
    </div>
  );
};

export default Header;
