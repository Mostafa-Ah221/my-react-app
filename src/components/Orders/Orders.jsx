import Style from './Orders.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { CartContext } from '../CartContext';
import { useContext } from 'react';


export default function Orders() {

    const { cartDetails } = useContext(CartContext);

    function getFeaturedAll() { 
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartDetails?.data._id}`);
  }

  let { isLoading, isError, data, isFetching } = useQuery(
    'featuredProducts', getFeaturedAll,
    {
      keepPreviousData: true
    }
  );


  console.log(data);
  
  return (<>
  
  orders
  </>
    
  )
}
