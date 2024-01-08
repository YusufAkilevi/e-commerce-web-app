import { useState } from "react";
import { useSelector } from "react-redux";

import Button from "../UI/Button";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const [showModal, setShowModal] = useState(false);
  if (cart.products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center font-semibold min-h-[55vh] p-5">
        <p className="text-xl text-center">Your cart is currently empty.</p>
        <p className="text-lg text-center">
          To fill your cart from Futuristic Shop&apos;s world full of opportunities
          You can start examining the products.
        </p>
      </div>
    );
  }
  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-[7fr_3fr] gap-10 py-5 px-5 sm:px-28  sm:py-20 ">
        <ul className="flex flex-col gap-5">
          {cart.products.map((product) => (
            <CartItem key={product.id} item={product} />
          ))}
        </ul>
        <div className="shadow-lg p-5 bg-slate-200 rounded self-start flex-auto">
          <div>
            <h2 className="text-md sm:text-xl font-bold text-gray-500">
              Total Products ({cart.totalQuantity})
            </h2>
            <p className="text-lg sm:text-2xl font-bold color-gray-500 my-5">
              Total Price: ${cart.totalAmount}
            </p>
          </div>
          <Button
            onClick={showModalHandler}
            className="flex items-center border-none justify-center bg-[#4361EE] font-semibold py-3 text-sm text-white gap-2.5 w-full hover:bg-[#7b90f3] hover:text-white"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
      {showModal && <Modal onClose={hideModalHandler} />}
    </>
  );
};
export default ShoppingCart;
