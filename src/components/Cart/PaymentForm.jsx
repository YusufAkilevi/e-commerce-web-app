import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();





  const userName = useRef();
  const cardNumber = useRef();
  const expiryDate = useRef();
  const cvvNumber = useRef();

  const cart = useSelector((state) => state.cart);

  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  const submitHandler = (e) => {
    e.preventDefault();

    let userOrders = JSON.parse(localStorage.getItem("userOrders"));

    let currentOrder = { ...cart, date: new Date() };

    let newUserOrder = { [userEmail]: [currentOrder] };

    if (userOrders) {
      if (userOrders[userEmail]) {
        userOrders[userEmail].push(currentOrder);
        console.log(userOrders);
      } else {
        userOrders = { ...userOrders, ...newUserOrder };
      }
      localStorage.setItem("userOrders", JSON.stringify(userOrders));
    } else {
      localStorage.setItem("userOrders", JSON.stringify(newUserOrder));
    }

    dispatch(cartActions.clearCart());
    localStorage.setItem(
      "cart",
      JSON.stringify({ products: [], totalAmount: 0, totalQuantity: 0 })
    );
    props.onClose();
    navigate("/my-orders");

  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-10">
      <div className="flex flex-col ">
        <label>Name</label>
        <input
          ref={userName}
          className="p-2.5 border rounded"
          type="text"
          placeholder="John Doe"
          required
        />
      </div>
      <div className="flex flex-col ">
        <label>Credit Card Number</label>
        <input
          ref={cardNumber}
          className="p-2.5 border rounded"
          type="number"
          placeholder="1234 **** **** 5678"
          required
        />
      </div>
      <div className="flex sm:flex-row flex-col justify-between gap-10">
        <div className="flex flex-col w-full">
          <label>Expiry Date</label>
          <input
            ref={expiryDate}
            className="p-2.5 border rounded"
            type="number"
            placeholder="07 / 23"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label>CVV</label>
          <input
            ref={cvvNumber}
            className="p-2.5 border rounded"
            type="number"
            placeholder="676"
            required
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="flex items-center justify-center bg-[#4361EE] hover:bg-[#7b90f3] font-semibold py-3 text-md tracking-wide text-white gap-2.5 w-full rounded  hover:text-white"
          type="submit"
        >
          Order
        </button>
      </div>
    </form>
  );
};
export default PaymentForm;
