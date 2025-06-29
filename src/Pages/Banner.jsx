import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    img: "https://i.ibb.co/mV44Mzv2/image.png",
    title: "Grow Together",
    btn: "Join the Community",
  },
  {
    img: "https://i.ibb.co/bjg7CMjw/image.png",
    title: "Urban Gardening Made Simple",
    btn: "Learn How",
  },
  {
    img: "https://i.ibb.co/SwD70sTM/image.png",
    title: "Your Green Journey Starts Here",
    btn: "Get Started",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    fade: true,
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 relative z-0"> {/* pt-16 to avoid navbar */}
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-opacity-50 p-8 rounded-md">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <Link
                  to="/explore-gardeners"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg transition"
                >
                  {slide.btn}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
