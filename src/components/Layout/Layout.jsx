import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Style from './Layout.module.css'
import { UserContext } from '../../Context/UserContext'
import { useContext, useEffect } from 'react'
import { Offline, Online } from "react-detect-offline";
import { CiWifiOff } from "react-icons/ci";
export default function Layout() {

  let {setUserToken}=useContext(UserContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  
  return (<>
    <Navbar/>
    <div className='flex-grow'>

    <div className="container mx-auto px-16 ">
      <Outlet></Outlet>
    </div>
    <div className='fixed bottom-8 left-8 bg-slate-50 w-fit p-2 z-50 shadow-xl flex items-center'>
      <CiWifiOff className=' mr-2'/>
    <Offline> You Are offline (surprise!)</Offline>
  </div>
    </div>
    <Footer/>
    </>
  )
}
