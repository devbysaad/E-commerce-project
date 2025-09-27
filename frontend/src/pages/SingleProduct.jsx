import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteProduct, updateProduct } from './../store/actions/productAction';
import { updateUser } from '../store/actions/userAction';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.productData);
  const user = useSelector((state) => state.user.userData);
  const renderProduct = product.find((product) => product.id == id);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (renderProduct) {
      reset({
        image: renderProduct.image,
        title: renderProduct.title,
        price: renderProduct.price,
        category: renderProduct.category,
        description: renderProduct.description,
      });
    }
  }, [renderProduct, reset]);

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
  const updateHandler = (product) => {
    dispatch(updateProduct(id, product));
    reset();
  };

  const deleteHandler = () => {
    dispatch(deleteProduct(id));
    navigate('/');
  };

  if (!renderProduct) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-900">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-white bg-gray-900 min-h-screen gap-8">
      {/* Product display */}
      <div className="flex flex-row items-center w-full max-w-4xl gap-7">
        <div className="w-full">
          <img
            src={renderProduct.image}
            alt={renderProduct.title}
            className="w-full max-h-[400px] object-cover rounded-lg mb-5"
          />
        </div>
        <div className="w-full text-center">
          <h1 className="text-5xl font-bold">{renderProduct.title}</h1>
          <p className="text-gray-300 text-xl mt-3">{renderProduct.description}</p>
          <p className="mt-2 text-2xl font-semibold">
            Price: {renderProduct.price}
          </p>
          <div className="flex flex-row justify-center gap-5">

            <button onClick={() => AddtoCartHandler(renderProduct)} className="mt-5 transition-all active:scale-95 px-4 py-2 bg-amber-400 text-black rounded-lg">
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-5 transition-all active:scale-95 px-4 py-2 bg-amber-400 text-black rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Update/Delete form for admin */}
      {user && user?.isAdmin && (
        <div className="w-full max-w-2xl">
          <form
            onSubmit={handleSubmit(updateHandler)}
            className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <input
              className="outline-none border-b border-gray-500 bg-transparent p-3"
              {...register('image')}
              type="text"
              placeholder="Image URL"
            />
            <input
              className="outline-none border-b border-gray-500 bg-transparent p-3"
              {...register('title')}
              type="text"
              placeholder="title"
            />
            <input
              className="outline-none border-b border-gray-500 bg-transparent p-3"
              {...register('description')}
              type="text"
              placeholder="description"
            />
            <input
              className="outline-none border-b border-gray-500 bg-transparent p-3"
              {...register('category')}
              type="text"
              placeholder="category"
            />
            <input
              className="outline-none border-b border-gray-500 bg-transparent p-3"
              {...register('price')}
              type="number"
              placeholder="Price"
            />
            <div className="flex flex-row w-full">
              <button className="px-25 py-2 border active:scale-95 border-gray-500 rounded-l-lg hover:bg-gray-700">
                Update Product
              </button>
              <button
                type="button"
                onClick={deleteHandler}
                className="px-25 py-2 border active:scale-95 border-gray-500 rounded-r-lg hover:bg-gray-700"
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
