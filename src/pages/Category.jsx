import { useParams } from "react-router-dom";

import CategoryProductList from "../components/Products/CategoryProductList";
const Category = () => {
  const { categoryName } = useParams();

  return <CategoryProductList category={categoryName} />;
};

export default Category;
