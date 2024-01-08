import { useSelector, useDispatch } from "react-redux";

import ProductCard from "./ProductCard";
import Loading from "../UI/Loading";
import { useEffect } from "react";
import { fetchSearchProductData } from "../../redux/slices/product/searchProductsSlice";
const SearchedProductList = () => {
  const dispatch = useDispatch();
  const searchParam = useSelector((state) => state.searchProducts.searchParam);

  useEffect(() => {
    dispatch(fetchSearchProductData(searchParam));
  }, [dispatch, searchParam]);

  const searchedProducts = useSelector(
    (state) => state.searchProducts.productData
  );
  const loading = useSelector((state) => state.searchProducts.loading);

  if (!loading && searchedProducts.products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-semibold text-lg">
          The product you are looking for was not found, please search for
          another product.
        </p>
      </div>
    );
  }
  return (
    <div className="pt-5 px-5 sm:px-28  sm:pt-20 ">
      <div className="mt-6 grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-10">
        {loading && (
          <div className="col-span-full flex justify-center h-screen">
            <Loading />
          </div>
        )}
        {!loading &&
          searchedProducts?.products.length > 0 &&
          searchedProducts?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
export default SearchedProductList;
