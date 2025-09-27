import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../store/actions/userAction";

const Products = () => {
  const productData = useSelector((state) => state.product.productData);
  const user = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()
  const AddtoCartHandler = (product) => {
  const copyUser = { ...user, cart: [...user.cart] };

  const data = copyUser.cart.findIndex((cartMap) => cartMap?.product?.id === product.id);

  if (data === -1) {
    // store the full product object
    copyUser.cart.push({ product, quantity: 1 });
  } else {
    copyUser.cart[data] = {
      product,
      quantity: copyUser.cart[data].quantity + 1,
    };
  }

  dispatch(updateUser(copyUser.id, copyUser));
  console.log(copyUser);
};

  const renderProduct = productData?.map((product) => (
    <div
      key={product.id}
      className="bg-gray-900 border border-gray-700 rounded-2xl h-[480px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
    >
      <Link to={`/singleProduct/${product.id}`} className="block">
        {product.image ? (
          <img
            className="w-full h-[240px] rounded-t-2xl object-cover"
            src={product.image}
            alt={product.title}
          />
        ) : (
          <div className="w-full h-[240px] bg-gray-800 flex items-center justify-center text-gray-400 rounded-t-2xl">
            No Image
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-5">
        <Link to={`/singleProduct/${product.id}`}>
          <h2 className="text-lg font-semibold text-white hover:text-amber-400 transition-colors">
            {product.title || "Untitled"}
          </h2>
        </Link>

        <p className="text-sm text-gray-400 mt-2 flex-grow line-clamp-4">
          {product.description
            ? `${product.description.slice(0, 150)}...`
            : "No description available."}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-amber-400 font-bold">
            ${product.price || "N/A"}
          </span>
          <button onClick={() => AddtoCartHandler(product)} className="bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 hover:scale-105 active:scale-95 transition-transform">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ));

  return productData && productData.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 w-full overflow-y-scroll no-scrollbar">
      {renderProduct}
    </div>
  ) : (
    <div className="text-center text-xl text-gray-400 p-10">Loading...</div>
  );
};

export default Products;
