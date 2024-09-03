import { useContext } from 'react';
import Style from './Address.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../CartContext';

export default function Address() {
  const { onlinePayment, cartDetails } = useContext(CartContext);
 console.log(cartDetails?.data.cartOwner);
 
  
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: (values) => handleAddressSubmit(cartDetails?.data._id, "http://localhost:5173", values)
  });

  async function handleAddressSubmit(cartId, url, values) {
    try {
      const response = await onlinePayment(cartId, url, values);
      console.log(values);
      console.log(response?.data.session.url);
      if (response?.data?.session?.url) {
        window.location.href = response.data.session.url;
      } else {
        console.error("URL not found in the response");
      }
    } catch (error) {
      console.error("Error processing payment", error);
    }
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details: </label>
        <input 
          type="text" 
          value={formik.values.details} 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          className='block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600' 
          name='details' 
          id='details' 
        />

        <label htmlFor="phone">Phone: </label>
        <input 
          type="tel" 
          value={formik.values.phone} 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          className='block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600' 
          name='phone' 
          id='phone' 
        />

        <label htmlFor="city">City: </label>
        <input 
          type="text" 
          value={formik.values.city} 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          className='block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600' 
          name='city' 
          id='city' 
        />

        <button type='submit' className='bg-green-500 text-white p-2 rounded-md mt-3'>
          Pay Now
        </button>
      </form>
    </div>
  );
}
