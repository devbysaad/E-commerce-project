import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/actions/userAction';

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const products = useSelector((state) => state.product.productData);

  const increaseHandler = (index, product) => {
    const copyUser = { ...user, cart: [...user.cart] };

    copyUser.cart[index] = {
      product: product,
      quantity: copyUser.cart[index].quantity + 1,
    };

    dispatch(updateUser(copyUser.id, copyUser));
  };

  const decreaseHandler = (index, product) => {
    const copyUser = { ...user, cart: [...user.cart] };
    const cartItem = copyUser.cart[index];

    if (cartItem) {
      const newQuantity = cartItem.quantity - 1;

      if (newQuantity > 0) {
        copyUser.cart[index] = {
          product: product, 
          quantity: newQuantity,
        };
      } else {
      
        copyUser.cart.splice(index, 1);
      }
    }

    dispatch(updateUser(copyUser.id, copyUser));
  };

  const renderCart = user?.cart?.map((cartItem, index) => {
    const product = cartItem.product; // ✅ full product is always here

    return (
      <li
        key={product.id}
        className="flex items-center gap-4 p-2 border-b border-gray-700"
      >
        <img
          className="w-12 h-12 object-cover rounded"
          src={product?.image}
          alt={product?.title || "loading"}
        />
        <div>
          <h2 className="text-white font-medium">{product?.title}</h2>
          <p className="text-gray-400">Quantity: {cartItem.quantity}</p>
          <p className="text-amber-400">Price: ${product?.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseHandler(index, product)}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            -
          </button>
          <span className="px-4 text-white">{cartItem.quantity}</span>
          <button
            onClick={() => increaseHandler(index, product)}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            +
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="max-w-2xl mt-15 m-5 mx-auto p-6 bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Your Cart</h2>
      <ul className="divide-y divide-gray-800">{renderCart}</ul>
    </div>
  );
};

export default Cart;
