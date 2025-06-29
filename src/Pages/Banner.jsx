import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../assets/banner1.jpg";
import bannerImg2 from "../assets/banner2.jpg";
import bannerImg3 from "../assets/banner3.jpg";

const Banner = () => {
  return (
    <Carousel AutoPlay infiniteLoop showThumbs={false}>
      <div>
        <img
          src={bannerImg1}
          alt="Banner 1"
          className="h-96 w-full object-cover"
        />
        <p className="legend">Gardening community</p>
      </div>
      <div>
        <img
          src={bannerImg2}
          alt="Banner 2"
          className="h-96 w-full object-cover"
        />
        <p className="legend">Join To explore</p>
      </div>
      <div>
        <img
          src={bannerImg3}
          alt="Banner 3"
          className="h-88 w-full object-cover"
        />
        <p className="legend">Learn about gardening</p>
      </div>
    </Carousel>
  );
};

export default Banner;
