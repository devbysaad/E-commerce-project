
import { Suspense, useState, useEffect, lazy } from "react";
import axios from "../api/config";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadLazyProduct } from "../store/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
const ProductTemp =lazy(() => import('./ProductTemp')) 

const Products = () => {
  const productData = useSelector((state) => state.product.productData);
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `/product?_limit=8&_start=${productData.length}`
      );

      if (data.length === 0) {
        setHasMore(false);
      } else {
        dispatch(loadLazyProduct(data))
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);



  const filteredProducts = productData.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="p-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <InfiniteScroll
        dataLength={productData.length}
        next={fetchProduct}
        hasMore={hasMore}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 w-full">
          <Suspense fallback={<div>Loading...</div>}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductTemp key={product.id} product={product} />
              ))
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
