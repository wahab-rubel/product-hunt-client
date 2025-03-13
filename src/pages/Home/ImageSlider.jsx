import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <Slider {...settings}>
        <div>
          <img src="https://i.ibb.co.com/0yTL6rcf/19.jpg" alt="Slide 1" className="w-full rounded-lg" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/0yTL6rcf/19.jpg" alt="Slide 2" className="w-full rounded-lg" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/0yTL6rcf/19.jpg" alt="Slide 3" className="w-full rounded-lg" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
