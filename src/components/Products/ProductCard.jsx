import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

import Button from "../UI/Button";
import { cartActions as cartSlice } from "../../redux/slices/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartSlice.addToCart(product));
  };
  return (
    <div
      key={product.id}
      className=" flex flex-col rounded-md p-6 cursor-pointer shadow-lg bg-slate-200"
    >
      <Link to={`/${product.category}/${product.id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-sm text-gray-700">{product.title}</h3>
          <p className=" text-sm text-gray-500">{product.brand}</p>
        </div>

        <div className="flex items-end gap-1.5 text-gray-500 text-sm mt-1">
          <Rating
            size={20}
            readonly
            allowFraction={true}
            initialValue={product.rating}
          />
          <span>{product.rating}</span>
        </div>

        <p className="text-sm font-medium text-gray-900 mt-2 mb-2">
          ${product.price}
        </p>
      </Link>
      <div className="mt-auto w-full">
        <Button
          onClick={addToCartHandler}
          className="flex items-center justify-center bg-[#4361EE] hover:bg-[#7b90f3] font-semibold py-3 text-sm text-white gap-2.5 w-full  hover:text-white"
        >
          <FontAwesomeIcon icon={faCartShopping} style={{ color: "#fff" }} />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
