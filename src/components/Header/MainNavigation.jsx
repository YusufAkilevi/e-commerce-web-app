import { useParams } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";

const MainNavigation = ({ isCategoriesShown, toggleCategories }) => {
  const params = useParams();
  const windowWidth = window.innerWidth;
  useEffect(() => {
    if (params.categoryName && windowWidth < 640) {
      toggleCategories();
    }
  }, [params]);

  const Categories = [
    {
      id: 1,
      name: "Electronics",
      subCategories: ["smartphones", "laptops", "automotive", "motorcycle"],
    },
    {
      id: 2,
      name: "Personal Care",
      subCategories: ["skincare", "fragrances"],
    },
    {
      id: 3,
      name: "Groceries",
      subCategories: ["groceries"],
    },
    {
      id: 4,
      name: "Home Decoration",
      subCategories: ["home-decoration", "furniture", "lighting"],
    },
    {
      id: 5,
      name: "Clothes",
      subCategories: [
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
      ],
    },
    {
      id: 6,
      name: "Accessories",
      subCategories: [
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
      ],
    },
  ];

  const showCategoriesClasses =
    "list-none flex sm:justify-between sm:items-center gap-5 sm:flex-wrap  sm:flex-row flex-col items-center justify-center bg-white sm:static absolute z-20 sm:h-auto h-screen w-full sm:top-auto top-0";

  const hideCategoriesClasses =
    "list-none flex sm:justify-between sm:items-center gap-5 sm:flex-wrap sm:flex-row flex-col items-center justify-center bg-white sm:static absolute z-20 sm:h-auto h-screen w-full sm:top-auto  top-0 -translate-x-full sm:translate-x-0 transition-all";

  return (
    <nav className="flex justify-center ">
      <ul
        className={
          isCategoriesShown ? showCategoriesClasses : hideCategoriesClasses
        }
      >
        {Categories.map((category, index) => (
          <li key={index}>
            <Dropdown category={category} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default MainNavigation;
