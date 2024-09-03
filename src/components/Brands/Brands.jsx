import { useDispatch, useSelector } from 'react-redux'
import Style from './Brands.module.css'
import { gitCategories } from '../../redux/categorySlice';
import { useEffect } from 'react';
import { GridLoader } from 'react-spinners';
export default function Brands() {
  const dispatch=useDispatch()
  const {loading,categories,error}=useSelector((state)=>state.categories)
  useEffect(()=>{
dispatch(gitCategories())
  },[])
  return (<>
         {loading?
          <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-50 bg-black opacity-50"> <GridLoader color="#0fa215" /></div>
        
         :
         <div>
          <h2 className='text-5xl text-green-500 text-center mt-5'>All Brands</h2>
          <div className='grid grid-cols-12 gap-5 my-11'>
           
          {categories.map((brand)=> <div className='col-span-12 md:col-span-6 lg:col-span-3 border text-center py-2 hover:shadow-2xl hover:scale-105 duration-500'>
            <div className="brand">
              <img className='w-full' src={brand.image} alt={brand.name} />
              <h3 className='my-2'>{brand.name}</h3>
            </div>

          </div>)}
          </div>
          </div>}
  </>
    
  )
}
