import Style from './CategoriesSlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // عندما يكون عرض الشاشة 1024 بكسل أو أقل
        settings: {
          slidesToShow: 6, // عرض 6 صور
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768, // عندما يكون عرض الشاشة 768 بكسل أو أقل
        settings: {
          slidesToShow: 3, // عرض 3 صور
          slidesToScroll: 2,
        }
      }
    ]
  };

  async function getCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  let { isLoading: isCategoryLoading, isError: isCategoryError, data: categoryData } = useQuery('getCategories', () => getCategories());

  return (
    <>
      <Slider {...settings}>
        {categoryData?.data.data.map((category, index) => (
          <div key={index}>
            <img className='h-48 w-full' src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
