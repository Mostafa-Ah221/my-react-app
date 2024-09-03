import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import FeaturedProdects from '../FeaturedProdects/FeaturedProdects'
import MainSlider from '../MainSlider/MainSlider'
import Style from './Home.module.css'
export default function Home() {
  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <FeaturedProdects showSearch ={true}/>
   
    </>

    
  )
}
