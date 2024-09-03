
import Slider from "react-slick";
import slid1 from '../../assets/images/img-1.jpg'
import slid2 from '../../assets/images/img-2.jpg'
import slid3 from '../../assets/images/img-3.jpg'
import slid33 from '../../assets/images/img-33.jpg'
import slid333 from '../../assets/images/img-333.jpg'



export default function MainSlider() {
   let settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
  
        <div className="grid grid-cols-12 my-10 justify-center items-center ">
  <div className="col-span-5 col-start-3">
    <Slider {...settings}>
      <img src={slid3} alt="jj"className="w-full h-[400px] object-cover"   />
      <img src={slid33} alt="ii"className="w-full h-[400px] object-cover"   />
      <img src={slid333} alt="ii"className="w-full h-[400px] object-cover"   />
    </Slider>
  </div>
  <div className="col-span-3">
    <img src={slid1} className="w-full h-[200px] object-cover"  alt="" />
    <img src={slid2} className="w-full h-[200px] object-cover" alt="" />
  </div>
</div>

  )
}
