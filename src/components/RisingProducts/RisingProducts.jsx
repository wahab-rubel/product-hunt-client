import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RisingProducts = () => {
  const { data: risingProducts = [] } = useQuery(['risingProducts'], () =>
    axios.get('/api/products/rising').then((res) => res.data)
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-4">🔥 Rising Products</h2>
      <Slider {...settings}>
        {risingProducts.map((product) => (
          <div key={product._id} className="px-2">
            <img src={product.imageURL} alt={product.productName} className="w-full h-40 object-cover rounded" />
            <h4 className="text-center mt-2 font-semibold">{product.productName}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RisingProducts;
