import { createContext, useEffect } from "react";

const WishContext=createContext()

 const handleAddToWishlist = async (productId) => {
    try {
        if(){}
    } catch (error) {
        
    }
 }

function WishContextProveder({children}) {
      const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  return (
    <>
    <WishContext.Provider value={{}}>
      {children}
    </WishContext.Provider>
    </>
  )
}

export default WishList
