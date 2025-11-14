import React from 'react';
import Banner from './Banner';
import FeaturedGardeners from '../components/FeaturedGardeners';
import TrendTip from '../components/TrendTip';
import Gardening from '../components/Gardening';
import GardeningTipsWeek from '../components/Weeklytips';




const Home = () => {
    
    return (
        <div className='relative z-0'> 
               
          <Banner></Banner>
          <FeaturedGardeners></FeaturedGardeners>
          <TrendTip></TrendTip>
          <Gardening></Gardening>
          <GardeningTipsWeek></GardeningTipsWeek>
      

           
        </div>
    );
};

export default Home;