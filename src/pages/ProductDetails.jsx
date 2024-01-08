import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductDetailComp from "../components/Products/ProductDetailComp";
import Loading from "../components/UI/Loading";
import { fetchProductData } from "../redux/slices/product/singleProductsSlice";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    dispatch(fetchProductData(productId));
  }, [dispatch, productId]);

  const product = useSelector((state) => state.singleProduct.productData);
  const loading = useSelector((state) => state.singleProduct.loading);

  if (loading)
    return (
      <div className="flex justify-center pt-20">
        <Loading />
      </div>
    );

  return (
    <div className="flex justify-center pt-5 sm:pt-20 ">
      {product.brand && <ProductDetailComp product={product} />}
    </div>
  );
};
export default ProductDetails;
