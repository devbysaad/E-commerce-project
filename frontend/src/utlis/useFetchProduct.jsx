import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLazyProduct } from "../store/reducers/productSlice";
import axios from "../api/config";

const useFetchProduct = () => {
    const productData = useSelector((state) => state.product.productData);
      const dispatch = useDispatch();
      const [hasMore, setHasMore] = useState(true);
      

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
  return {hasMore, productData, fetchProduct}
}

export default useFetchProduct