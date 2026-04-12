import Image from "next/image";
import Product from "./_Component/Product/Product";
import slider1 from '../assets/home-slider-1.d79601a8.png'
import slider2 from '../assets/slidertr.png'
import slider3 from '../assets/slider2.jpg'
import MySlider from "./_Component/Slider/Slider";
import Categories from "./_Component/Categories/Categories";
import { getServerSession } from "next-auth";

export default function Home() {

  getServerSession()


  return (
    <div>
      {/* slider  */}
       <MySlider pageList={[slider1.src, slider2.src, slider3.src]} slidesPerView={1}/>

      {/* categories  */}
      <Categories/>

      {/* product  */}
      <Product/>
    </div>
  );
}
      