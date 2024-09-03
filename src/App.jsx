
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Layout from './components/Layout/Layout'
import ProductsDetails from './components/ProductDetails/ProductDetails'
import UserContextProvider from './Context/UserContext'
import {QueryClient,QueryClientProvider} from 'react-query'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import {ReactQueryDevtools} from 'react-query/devtools'
import CartContextProveder from './components/CartContext'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/Store'
import Address from './components/Address/Address'
import Orders from './components/Orders/Orders'
import WishList from './components/WishList/WishList'


function App() {
  let queryClient =new QueryClient()
let router=createBrowserRouter([
   {path:"", element:<Layout/>,children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"categories", element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"cart", element:<ProtectedRoute><Cart/> </ProtectedRoute>},
    {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"products", element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"wishlist", element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:"address", element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:"allorders", element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:"productsdetails/:id/:category", element:<ProtectedRoute><ProductsDetails/></ProtectedRoute>},
    {path:"login", element:<Login/>},
   
    {path:"register", element:<Register/>},
    {path:"*", element:<NotFound/>},
   ]}
])
  
  return(
    <CartContextProveder>
  <QueryClientProvider client={queryClient}>
     <UserContextProvider>
      <Provider store={store}>
        <RouterProvider router={router}>
       </RouterProvider>
         <Toaster/>
      </Provider>
    
  </UserContextProvider>
  <ReactQueryDevtools initialIsOpen="false" position='bottom-right'/>
  </QueryClientProvider>
 
  </CartContextProveder>
  )
}

export default App
