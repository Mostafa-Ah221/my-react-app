import { useContext } from 'react';
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import { FaRegTrashAlt } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CartContext } from '../CartContext';

export default function WishList() {
  const { addItem } = useContext(CartContext);
  const queryClient = useQueryClient();  

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getWishList() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers,
    });
  }

  const mutation = useMutation(
    (id) => axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('wishlist');
      },
    }
  );

  function deleteProduct(id) {
    mutation.mutate(id);
  }

  const { isLoading: isFetchingWishlist, isError, data } = useQuery('wishlist', getWishList, {
    keepPreviousData: true,
  });

  if (isFetchingWishlist || mutation.isLoading) {
    return (
      <div className='flex justify-center items-center opacity-50 bg-t mt-40'>
        <GridLoader color="#0fa215" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading wishlist</div>;
  }

 
  const wishlistItems = data?.data?.data || [];

  return (
    <div className='w-5/6 mx-auto p-14 rounded-lg bg-slate-100 md:my-10'>
      <h3 className='text-4xl'>My Wish List</h3>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((product) => (
          <div key={product.id} className='grid grid-cols-12 justify-center items-center my-7 border-b border-gray-300 pb-2'>
            <div className='col-span-3 mr-4'>
              <img className='w-full' src={product.imageCover} alt={product.category.name} />
            </div>
            <div className='col-span-7 ml-3'>
              <h5 className='text-xl'>{product.title}</h5>
              <h6 className='text-green-500'>Price: {product.price} EGP</h6>
              <button onClick={() => deleteProduct(product.id)}>
                <FaRegTrashAlt className='text-red-700 inline mb-1' /> Remove
              </button>
            </div>
            <button onClick={() => addItem(product.id)} className='col-span-2 btn-cart text-xl text-black mx-auto w-full border-green-500 border duration-500 p-2 rounded-md mt-2'>
              Add To Cart
            </button>
          </div>
        ))
      ) : (
        <div>No items in wishlist</div>
      )}
    </div>
  );
}
