import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

 export const CartContext=createContext()


const headers={
    token:localStorage.getItem("userToken")
}

function addToCart(id){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
           productId:id
        },
        {
            headers
        }
).then((response)=>response)
.catch((error)=> error)
}

function getLoggedUserCart (){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>response)
    .catch((error)=> error)
}
function removeProductItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers
    }).then((response)=>response)
    .catch((error)=>error)
}
function updataProductQuantity(productId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers})
    .then((response)=>response)
    .catch((error)=>error)
}
function onlinePayment(cartId,url,values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
      shippingAddress:values
    },{headers})
    .then((response)=>response)
    .catch((error)=>error)
}

async function getWishList(id){
  const {}=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
     {
           productId:id
        },
        {
            headers
        }
  )
}

 export default function CartContextProveder({children}){
    const [cartDetails, setCartDetails] = useState(null);
   

  useEffect(() => {
    fetchCartData();
  }, []);

  async function fetchCartData() {
    const { data } = await getLoggedUserCart();
    setCartDetails(data); 
    // console.log(data?.data);
    
  }
async function addItem(id) {
  try {
    const { data } = await addToCart(id);
    if (data && data.status === "success") {
      setCartDetails(data);
      toast.success('Product successfully added', {
        duration: 3000
      });
    } else {
      toast.error('Error adding product');
    }
  } catch (error) {
    toast.error('An error occurred while adding the product');
  }
}

  
  async function removeItem(id) {
    const {data}=await removeProductItem(id)
    setCartDetails(data)
        // console.log(data);

  }
  async function updataCount(id,count) {
    const {data}=await updataProductQuantity(id,count)
    setCartDetails(data)
        // console.log(data);
  }


    
    return <CartContext.Provider value={{getWishList, onlinePayment,addItem, updataCount,removeItem,cartDetails}}>
        {children}
    </CartContext.Provider>
 }