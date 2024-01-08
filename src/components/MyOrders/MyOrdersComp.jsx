import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

import Order from "./Order";

const MyOrdersComp = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  console.log(JSON.parse(localStorage.getItem("userOrders")));

  if (!JSON.parse(localStorage.getItem("userOrders")))
    return (
      <p className="text-center mt-20 font-semibold text-xl">
        There is no order to show!
      </p>
    );

  if (!JSON.parse(localStorage.getItem("userOrders"))[userEmail]) {
    return (
      <p className="text-center mt-20 font-semibold text-xl">
        There is no order to show!
      </p>
    );
  }
  const orders = JSON.parse(localStorage.getItem("userOrders"))[userEmail];
  console.log(orders);

  const orderExpandHandler = (e) => {
    console.log(e.target.id, expandedOrder);
    if (e.target.id == expandedOrder) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(e.target.id);
    }
  };
  return (
    <div className="py-5 px-5 sm:px-60  sm:py-20 ">
      <h1 className="font-bold text-2xl mb-10">My Orders</h1>
      <ul className="flex flex-col gap-5">
        {orders?.map((order, i) => (
          <li
            className="bg-slate-300 p-2.5 sm:p-5 rounded flex  items-center justify-between w-full"
            key={i}
          >
            <div className="flex flex-col items-center w-full">
              <div className="flex  items-center justify-between gap-5 w-full">
                <div>
                  <p className="font-semibold text-lg sm:text-xl">
                    Order {i + 1}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-md sm:text-lg text-gray-500">
                    {new Date(order.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1 sm:gap-5">
                  <div>
                    <p className="font-bold text-lg sm:text-xl">
                      ${order.totalAmount}
                    </p>
                  </div>
                  <motion.button
                    animate={{ rotate: i == expandedOrder ? 180 : 0 }}
                    className="p-2.5 flex gap-2.5 w-full"
                    id={i}
                    onClick={orderExpandHandler}
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ color: "#4361EE", pointerEvents: "none" }}
                    />
                  </motion.button>
                </div>
              </div>
              <AnimatePresence>
                {expandedOrder == i && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col gap-5 pt-10"
                  >
                    {order.products?.map((product) => (
                      <Order key={product.id} product={product} />
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyOrdersComp;
