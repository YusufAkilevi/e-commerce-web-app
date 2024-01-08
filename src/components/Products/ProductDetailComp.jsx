import { Rating } from "react-simple-star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDispatch } from "react-redux";

import Button from "../UI/Button";
import { cartActions } from "../../redux/slices/cart/cartSlice";

const ProductDetailComp = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <div className="grid grid-cols-1fr lg:grid-cols-[3fr_2fr] mx-5 sm:mx-40 sm:mb-20 shadow-lg  bg-slate-300 rounded ">
      <div className="justify-self-center p-2 sm:p-10  max-w-xs sm:max-w-fit">
        <Carousel>
          {product.images.map((image, i) => (
            <div key={i}>
              <img
                className=" sm:max-h-96 object-contain rounded"
                src={image}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="p-5 sm:p-10 bg-slate-200 rounded self-center flex justify-center flex-col h-full">
        <div>
          <h2 className="text-2xl font-bold color-gray-500">{product.title}</h2>
          <p className="text-gray-500">{product.brand}</p>
          <div className="flex justify-between mt-4">
            <p className="text-xl font-bold color-gray-500">${product.price}</p>
            <div className="flex items-end gap-1.5 text-gray-500 text-sm mt-1">
              <Rating
                size={20}
                readonly
                allowFraction={true}
                initialValue={product.rating}
              />
              <span>{product.rating}</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold">About this item</h3>
            <p className="text-gray-500 text-md">{product.description}</p>
          </div>
          <div className="flex items-center gap-2.5 mt-10">
            {/* <select
              className="bg-white cursor-pointer rounded py-3 pl-2.5 pr-0 text-align-right   "
              name="quantity"
              id="quantity"
            >
              {getStockQuantity(product.stock)}
            </select> */}

            <Button
              onClick={addToCartHandler}
              className=" flex items-center justify-center gap-2.5 border-none  w-full bg-[#4361EE] font-semibold py-3 text-sm text-white gap-2.5 w-full hover:bg-[#7b90f3] hover:text-white"
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ color: "#fff" }}
              />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailComp;
