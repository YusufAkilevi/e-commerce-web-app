const Order = ({ product }) => {
  return (
    <li
      key={product.id}
      className="flex gap-2.5 p-5 border shadow-lg bg-slate-200 rounded"
    >
      <div className="max-w-xs max-h-36 bg-white p-2  border rounded">
        <img
          className="w-full h-full object-contain"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="flex flex-col gap-2.5 items-start flex-auto">
        <p className="text-lg sm:text-2xl font-bold color-gray-500">
          {product.title}
        </p>
        <p className="text-sm sm:text-lg text-gray-500">{product.brand}</p>
      </div>
      <div>
        <p className="text-lg sm:text-2xl font-bold color-gray-500">
          ${product.price}
        </p>
      </div>
    </li>
  );
};
export default Order;
