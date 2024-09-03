import { useContext } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../CartContext';
import { FaRegTrashAlt } from "react-icons/fa";
import { GridLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartDetails, removeItem, updataCount } = useContext(CartContext);

  return (
    <>
      {cartDetails ? (
        <div className='w-11/12 md:w-3/4 mx-auto p-2 bg-slate-200 my-10 lg:my-2'>
          <div className='flex justify-between md:flex-row flex-col items-center mt-5'>
            <h3 className='text-xl md:text-2xl mb-2 lg:mb-0 font-medium'>Shopping Cart</h3>
            <Link to={"/address"} className='md:text-xl w-full text-center md:w-fit p-3 bg-blue-600 rounded-md text-white'>Online payment</Link>
          </div>
          <div className='flex justify-between md:flex-row flex-col items-center my-3'>
            <h4 className='font-medium text-xl'>
              Cart items: <span className='text-green-500'>{cartDetails.numOfCartItems}</span>
            </h4>
            <h4 className='font-medium text-xl'>
              Total price: <span className='text-green-500'>{cartDetails?.data?.totalCartPrice} EGP</span>
            </h4>
          </div>
          {cartDetails?.data?.products?.map((product,index) => (
            <div key={index} className='grid grid-cols-12 my-5 border-b border-gray-300 pb-2'>
              <div className='col-span-12 md:col-span-3 lg:col-span-2 mr-4'>
                <img className='w-full' src={product?.product?.imageCover} alt={product?.product?.category?.name} />
              </div>
              <div className='col-span-12 md:col-span-9 lg:col-span-10'>
                <div className='flex justify-between items-center'>
                  <div className=''>
                    <h5>{product.product.title}</h5>
                    <h6 className='text-green-500'>Price: {product.price} EGP</h6>
                  </div>
                  <div >
                    <button onClick={() => updataCount(product.product.id, product.count + 1)} className='border border-green-300 px-1 text-xl'>+</button>
                    <span className='mx-2'>{product.count}</span>
                    <button onClick={() => updataCount(product.product.id, product.count - 1)} className='border border-green-300 px-1 text-xl'>-</button>
                  </div>
                </div>
                <button onClick={() => removeItem(product.product.id)} >
                  <FaRegTrashAlt className='text-red-700 inline mb-1 ' /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center mt-20'>
          <GridLoader color="#0fa215" />
        </div>
      )}
    </>
  );
}
