import Slider from "react-slick";
import { Link } from "react-router";

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
};


  const slides = [
    {
      img: "https://i.ibb.co/kVQBkTbV/Ctd-Mp-L87k-Vinsu5b-AMLshn-1280-80-jpeg.webp",
      title: "Grow Together",
      btn: "Join the Community",
    },
    {
      img: "https://i.ibb.co/J15DBmg/photo-1492496913980-501348b61469.jpg",
      title: "Urban Gardening Made Simple",
      btn: "Learn How",
    },
    {
      img: "https://i.ibb.co/PvpGJTXW/photo-1546580594-a64816022c1b.jpg",
      title: "Your Green Journey Starts Here",
      btn: "Get Started",
    },
  ];

  return (
    <div className="relative max-w-7xl mx-auto my-10">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-black bg-opacity-40 p-8 rounded-md">
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
