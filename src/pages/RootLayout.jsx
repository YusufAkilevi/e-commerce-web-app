import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import { authActions } from "../redux/slices/auth/authSlice";
import { cartActions } from "../redux/slices/cart/cartSlice";
const RootLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.getAuthFromLocalStorage());
    dispatch(cartActions.getCartFromLocalStorage());
  }, []);
  return (
    <div className="flex flex-col  items-between min-h-screen">
      <Header />
      <main className="min-h-[90vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default RootLayout;
