import React from 'react'
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../store/actions/productAction';

const CreateProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  const RegisterHandler = (product) => {
    product.id = nanoid()
    console.log(product);
    navigate('/')
    dispatch(createProduct(product))
    reset()
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <form 
        onSubmit={handleSubmit(RegisterHandler)} 
        className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-lg flex flex-col items-center gap-6"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Create New Product</h1>

        <input
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('image')}
          type="url"
          placeholder="Select Image from Gallery"
        />
        <input
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('title')}
          type="text"
          placeholder="Title"
        />
        <input
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('description')}
          type="text"
          placeholder="Description"
        />
        <input
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('category')}
          type="text"
          placeholder="Category"
        />
        <input
          className="outline-none w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
          {...register('price')}
          type="number"
          placeholder="Price"
        />

        <button 
          type="submit" 
          className="w-full py-3 mt-4 bg-amber-500 text-black font-semibold rounded-lg shadow-md hover:bg-amber-400 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
