
import Style from './Navbar.module.css'
import { Link, NavLink } from 'react-router-dom'; 
import { IoLogoFacebook } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { UserContext } from '../../Context/UserContext';
import { useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../CartContext';
import { FiAlignJustify } from "react-icons/fi";
export default function Navbar() {
    let {userToken,setUserToken}=useContext(UserContext)
    const [open, setOpen] = useState(false)
  const {cartDetails}=useContext(CartContext)


  function openNavbar (){
    if(open == false){

      setOpen(true)
    }else{
      setOpen(false)
    }
  }
 const navigate=useNavigate()
function Logout(){
  navigate('/login')
  setUserToken(null)
  localStorage.removeItem("userToken")
}


 return (
    <nav className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:flex-row flex-col">
        <div className='flex justify-between items-center w-full lg:w-fit'>
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse lg:w-fit justify-start w-full">
          <FaShoppingCart className='text-3xl text-green-500'/>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">fresh cart</span>
        </Link>
              <span onClick={()=> openNavbar()} className='ml-3 text-white cursor-pointer text-2xl p-2 lg:hidden'><FiAlignJustify/></span>

        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
         
          <ul className={`lg:flex text-white items-center lg:static sm:relative sm:top-72  ${open ? "block" : "hidden"} `}>
            <Link to={"/cart"} className={`relative lg:right-16 ${Style.shops} lg:bottom-0 text-slate-300`}>
            <span className='text-xs bg-green-500 text-white px-2 rounded-md lg:absolute lg:left-7 bottom-6'>{cartDetails?.numOfCartItems}</span><FaShoppingCart className='text-3xl md:ml-auto md:relative md:left-3'/>
            </Link>
              <li className='mx-2 lg:flex gap-x-2 items-center md:my-2 hidden'>
              <IoLogoFacebook />
              <FaTwitter />
              <FaTiktok />
              <FaYoutube />
              <FaInstagramSquare />
             
            </li>
            {userToken !== null? <li className='mx-2 cursor-pointer md:flex md:justify-center'>
              <span  onClick={()=> Logout()}>Logout</span>
            </li>: <>
            <li className='mx-2'>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className='mx-2'>
              <NavLink to="/login">Login</NavLink>
            </li>
            
            </>}
           
           
          
            
          </ul>
        </div>
        <div
          className="items-center justify-between w-full md:flex lg:w-auto md:order-1"
          id="navbar-sticky">
          <ul className={`lg:flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-900  ${open ? "block" : "hidden"} `}>
            {userToken !== null ? <>
            <li className='md:my-2' onClick={()=> setOpen(false)}>
              <NavLink
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:ml-7"
                aria-current="page">Home
              </NavLink>
            </li>
            <li className='md:my-2' onClick={()=> setOpen(false)}>
              <NavLink
                to="/cart"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"  >
                Cart
              </NavLink>
            </li>
            <li className='md:my-2' onClick={()=> setOpen(false)}>
              <NavLink
                to="/products"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Products
              </NavLink>
            </li>
            <li className='md:my-2' onClick={()=> setOpen(false)}>
              <NavLink
                to="/categories"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Categories
              </NavLink>
            </li>
            <li className='md:my-2' onClick={()=> setOpen(false)}>
              <NavLink
                to="/brands"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Brands
              </NavLink>
            </li>
            <li className='md:my-2' onClick={()=> setOpen(false)}>
              <NavLink
                to="/wishlist"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Wish List
              </NavLink>
            </li>
          </> :"" }
         
          </ul>
        </div>
      </div>
    </nav>
  );
  
}
