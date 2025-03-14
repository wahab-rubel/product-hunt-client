import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CouponSlider = () => {
  const [coupons, setCoupons] = useState([]);

  // Fetch coupons from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/coupons")
      .then((res) => res.json())
      .then((data) => {
        console.log("Coupons:", data.coupons);
        setCoupons(data.coupons || []);
      });
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="max-w-3xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        🎁 Special <span className="text-orange-600">Discount Coupons</span>
      </h2>

      {coupons.length > 0 ? (
        <Slider {...settings}>
          {coupons.map((coupon) => (
            <div key={coupon._id} className="px-4">
              <div className="relative bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="absolute top-2 right-2 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
                  {coupon.discount}% OFF
                </div>
                <h3 className="text-2xl font-bold mb-2">{coupon.code}</h3>
                <p className="text-lg mb-4">{coupon.description}</p>
                <p className="text-sm italic">Valid until: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">🚫 No active coupons available right now.</p>
      )}
    </div>
  );
};

export default CouponSlider;
