import { useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FaStar, FaHeart } from 'react-icons/fa';
import { GridLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Search from '../Products/Search';
import toast from 'react-hot-toast';


export default function FeaturedProducts({ showSearch = true }) {
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const { addItem } = useContext(CartContext);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  function getFeaturedProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (Array.isArray(storedWishlist)) {
      setWishlist(storedWishlist);
    } else {
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

 const handleAddToWishlist = async (productId) => {
try {
    if (wishlist.includes(productId)) {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
      const updatedWishlist = wishlist.filter(id => id !== productId);
      setWishlist(updatedWishlist);

     toast.success(
        <div>
          Product successfully removed <FaHeart />
        </div>,
        {
          duration: 2000
        }
      );
    } else {
      await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
      const updatedWishlist = [...wishlist, productId];
      setWishlist(updatedWishlist);

      toast.success(
        <div>
          Product successfully added <FaHeart className='text-red-500'/>
        </div>,
        {
          duration: 2000
        }
      );
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
  }
};

  let { isLoading, isError, data } = useQuery('featuredProducts', getFeaturedProducts, {
    keepPreviousData: true,
  });

  if (isLoading) return <GridLoader color="#0fa215" />;
  if (isError) return <div>Error loading products</div>;

  const filteredProducts = data?.data.data.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <>
      {showSearch && <Search search={search} setSearch={setSearch} />}
      <div className='w-full flex justify-center py-5'>
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className='parent-div cursor-pointer hover:border border-cyan-950'>
                  <div className="product py-3 px-2">
                    <Link to={`/productsdetails/${product.id}/${product.category.name}`}>
                      <img className='w-full' src={product.imageCover} alt={product.title} />
                      <span className='text-green-600'>{product.category.name}</span>
                      <h3 className='h5'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className='flex justify-between items-center mt-3'>
                        <span>{product.price} EGP</span>
                        <span>{product.ratingsAverage}<FaStar className='text-yellow-400 inline ml-1' /> </span>
                      </div>
                    </Link>
                    <div className='flex justify-end items-center'>
                    <FaHeart
                      className={`text-2xl cursor-pointer ${wishlist.includes(product.id) ? 'text-red-500' : 'text-black'}`}
                      onClick={() => handleAddToWishlist(product.id)}
                    />
                   
                    </div>
                    <button onClick={() => addItem(product.id)} className='btn-cart text-white mx-auto w-full bg-green-500 hover:bg-green-700 duration-500 p-2 rounded-md mt-2 '>
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
