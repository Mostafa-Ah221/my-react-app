import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

export const CartContext = createContext();

function addToCart(id) {
  const headers = {
    token: localStorage.getItem("userToken")
  };
  
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      productId: id
    },
    {
      headers
    }
  ).then((response) => response)
    .catch((error) => error);
}

function getLoggedUserCart() {
  const headers = {
    token: localStorage.getItem("userToken")
  };

  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers
  }).then((response) => response)
    .catch((error) => error);
}

function removeProductItem(productId) {
  const headers = {
    token: localStorage.getItem("userToken")
  };

  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    headers
  }).then((response) => response)
    .catch((error) => error);
}

function updataProductQuantity(productId, count) {
  const headers = {
    token: localStorage.getItem("userToken")
  };

  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
    .then((response) => response)
    .catch((error) => error);
}

function onlinePayment(cartId, url, values) {
  const headers = {
    token: localStorage.getItem("userToken")
  };

  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      shippingAddress: values
    }, { headers })
    .then((response) => response)
    .catch((error) => error);
}

async function getWishList(id) {
  const headers = {
    token: localStorage.getItem("userToken")
  };
  
  const {} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      productId: id
    },
    {
      headers
    }
  );
}

export default function CartContextProvider({ children }) {
  const [cartDetails, setCartDetails] = useState(null);

  useEffect(() => {
    fetchCartData();
  }, []);

  async function fetchCartData() {
    try {
      const { data } = await getLoggedUserCart();
      if (data) {
        setCartDetails(data);
      } else {
        toast.error('Failed to load cart data');
      }
    } catch (error) {
      toast.error(`Error fetching cart data: ${error.response?.data?.message || error.message}`);
    }
  }

  async function addItem(id) {
        console.log("Product ID:", id);

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
      toast.error(`An error occurred while adding the product: ${error.response?.data?.message || error.message}`);
    }
  }

  async function removeItem(id) {
    // console.log("Product ID:", id);

    try {
      const { data } = await removeProductItem(id);
      if (data) {
        setCartDetails(data);
        toast.success('Product successfully removed');
      } else {
        toast.error('Error removing product');
      }
    } catch (error) {
      toast.error(`Error removing product: ${error.response?.data?.message || error.message}`);
    }
  }
console.log("Token:", localStorage.getItem("userToken"));

  async function updataCount(id, count) {
    try {
      const { data } = await updataProductQuantity(id, count);
      if (data) {
        setCartDetails(data);
        toast.success('Product quantity updated');
      } else {
        toast.error('Error updating product quantity');
      }
    } catch (error) {
      toast.error(`Error updating product quantity: ${error.response?.data?.message || error.message}`);
    }
  }

  return (
    <CartContext.Provider value={{ getWishList, onlinePayment, addItem, updataCount, removeItem, cartDetails }}>
      {children}
    </CartContext.Provider>
  );
}
