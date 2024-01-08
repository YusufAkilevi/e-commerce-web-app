import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../UI/Loading";
import { fetchCategoryProductData } from "../../redux/slices/categoryProductsSlice";
import ProductCard from "./ProductCard";

const CategoryProductList = ({ category }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryProductData(category));
  }, [dispatch, category]);

  const productData = useSelector(
    (state) => state.categoryProducts.productData
  );
  const loading = useSelector((state) => state.categoryProducts.loading);

  return (
    <div className={"pt-5 px-5 sm:px-8 sm:pt-10 md:px-28  md:pt-20"}>
      <div className="mt-6 grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-10">
        {loading && (
          <div className="col-span-full flex justify-center">
            <Loading />
          </div>
        )}
        {!loading &&
          productData.products.length > 0 &&
          productData?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
export default CategoryProductList;
