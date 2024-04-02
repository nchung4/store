import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/configureStore";
import { api } from "./api";
import { setFav } from "./store/favorite/favoriteSlice";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import SearchProductPage from "./pages/SearchProductPage";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (auth) {
      (async () => {
        try {
          const result = await api.get<{
            content: {
              productsFavorite: {
                id: number;
              }[];
            };
          }>("/Users/getproductfavorite", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          });
          dispatch(
            setFav(result.data.content.productsFavorite.map((item) => item.id))
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [auth, dispatch]);
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen">
            loading
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/search" element={<SearchProductPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
