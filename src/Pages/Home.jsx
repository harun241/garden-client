import React from 'react';
import Banner from './Banner';
import FeaturedGardeners from '../components/FeaturedGardeners';
import TrendTip from '../components/TrendTip';




const Home = () => {
    
    return (
        <div className='relative z-0'> 
               
          <Banner></Banner>
          <FeaturedGardeners></FeaturedGardeners>
          <TrendTip></TrendTip>
      

           
        </div>
    );
};

export default Home;