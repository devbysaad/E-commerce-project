import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../store/actions/userAction";
import { Suspense, useState, useEffect } from "react";
import axios from "../api/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadProduct } from "../store/reducers/productSlice";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search state
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `/product?_limit=6&_start=${productData.length}`
      );
      console.log(data);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setProductData([...productData, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const AddtoCartHandler = (product) => {
    if (!user) {
      console.warn("User not logged in, cannot add to cart.");
      return;
    }

    const copyUser = { ...user, cart: [...(user.cart || [])] };

    const index = copyUser.cart.findIndex(
      (cartItem) => cartItem?.product?.id === product.id
    );

    if (index === -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[index] = {
        product,
        quantity: copyUser.cart[index].quantity + 1,
      };
    }

    dispatch(updateUser(copyUser.id, copyUser));
    console.log("Updated user cart:", copyUser);
  };

  // 🔍 Filter products based on searchTerm
  const filteredProducts = productData.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderProduct = filteredProducts.map((product) => (
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
            {product.title
              ? `${product.title.slice(0, 30)}...`
              : "No title available."}
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
          <button
            onClick={() => AddtoCartHandler(product)}
            className="bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 hover:scale-105 active:scale-95 transition-transform"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="w-full">
      {/* 🔍 Search Bar */}
      <div className="p-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // update search
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <InfiniteScroll
        dataLength={productData.length}
        next={fetchProduct}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-white" style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 w-full">
          <Suspense className="text-center" fallback={<div>Loading...</div>}>
            {renderProduct.length > 0 ? (
              renderProduct
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No products found.
              </p>
            )}
          </Suspense>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products;
