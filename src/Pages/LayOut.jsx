import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from './Banner';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';
import Testimonial from '../components/Tesimonials';
import Navbar from '../components/Navbar';

const LayOut = () => {
    const location = useLocation();
    const hideTestimonial = location.pathname === '/login' || location.pathname === '/register';
    const hideFooter=location.pathname === '/login' || location.pathname === '/register';
    return (
        <div>
            <Navbar />

            <Outlet />

           
            {!hideTestimonial && <Testimonial />}

            {!hideFooter && <Footer/>}
        </div>
    );
};

export default LayOut;
