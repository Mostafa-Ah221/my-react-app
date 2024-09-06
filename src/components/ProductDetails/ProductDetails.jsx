import Style from './ProductDetails.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { FaStar } from "react-icons/fa";
import { FaHeart } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import React from "react";
import Slider from "react-slick";
import {Helmet} from "react-helmet";

export default function ProductDetails() {
 let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { id, category } = useParams();

  async function getProductDetails(id) { 
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  async function getCategoryDetails(category) { 
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    const related = data.data.filter((product) => product.category.name === category);
    return related;
  }

  let { isLoading: isProductLoading, isError: isProductError, data: productData } = useQuery(['productdetails', id], () => getProductDetails(id));
  // console.log(productData?.data.data.images);
  
  let { isLoading: isCategoryLoading, isError: isCategoryError, data: categoryData } = useQuery(['categorydetails', category], () => getCategoryDetails(category));

  if (isProductLoading || isCategoryLoading) return<div className='w-full py-56 flex justify-center items-center'><GridLoader color="#0fa215" /></div>;
  if (isProductError || isCategoryError) return <div>Error occurred</div>;

  return (
    <>
      <div className='container'>
        <div className="details py-3 px-2 grid grid-cols-12 gap-3 justify-center items-center">
          <div className='w-full col-span-4'>
<Helmet>
    <meta charSet="utf-8" />
    <title>{productData.data.data.title}</title>
  </Helmet>
           <Slider {...settings}>
     {productData?.data.data.images.map((img,index)=>
     
     <img className='w-full'key={index} src={img} alt={productData?.data.data.title} />
)}

    </Slider>
          </div>
          <div className='col-span-8'> 
            <h2 className='text-3xl'>{productData?.data.data.title.split(" ").slice(0, 2).join(" ")}</h2>
            <p>{productData?.data.data.description}</p>
            <div className='flex justify-between items-center mt-3'>
              <span>{productData?.data.data.price} EGP</span>
              <span>{productData?.data.data.ratingsAverage}<FaStar className='text-yellow-400 inline ml-1'/> </span>
            </div>
            <div className='flex justify-center items-center'>
              <button className='btn-cart text-white mx-auto w-3/4 bg-green-500 hover:bg-green-700 duration-500 p-2 rounded-md mt-2'>
                +Add
              </button>
              <FaHeart color='#1f513b' className='text-3xl'/>
            </div>
          </div>
        </div>
        <div className="row grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {categoryData?.map((categ) => (
            <div key={categ.id}>
              <div className='parent-div cursor-pointer hover:border border-cyan-950'>
                <Link to={`/productsdetails/${categ.id}/${categ.category.name}`}>
                  <div className="product py-3 px-2">
                    <img className='w-full' src={categ.imageCover} alt={categ.title} />
                    <span className='text-green-600'>{categ.category.name}</span>
                    <h3 className='h5'>{categ.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <div className='flex justify-between items-center mt-3'>
                      <span>{categ.price} EGP</span>
                      <span>{categ.ratingsAverage}<FaStar className='text-yellow-400 inline ml-1'/> </span>
                    </div>
                    <button className='btn-cart text-white mx-auto w-full bg-green-500 hover:bg-green-700 duration-500 p-2 rounded-md mt-2'>
                      Add To Cart
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
