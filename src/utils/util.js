import { useState, useEffect } from "react";

export const getTotalPageNumbers = (totalProducts, pageLimit) => {
  return totalProducts % pageLimit === 0
    ? totalProducts / pageLimit
    : Math.floor(totalProducts / pageLimit) + 1;
};

// export const useFetch = (url) => {
//   const [productsList, setProductsList] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [totalPageNum, setTotalPageNum] = useState(0);

//   useEffect(() => {
//     setIsFetching(true);
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         if (!totalPageNum) {
//           setTotalPageNum(getTotalPageNumbers(data.total, data.limit));
//         }
//         setProductsList(data.products);
//         setIsFetching(false);
//       });
//   }, [url]);

//   return { productsList, isFetching, totalPageNum };
// };
