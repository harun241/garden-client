import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';
import Testimonial from '../components/Tesimonials';
import Navbar from '../components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayOut = () => {
    const location = useLocation();

    const hideTestimonial = location.pathname === '/login' || location.pathname === '/register';
    const hideFooter = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div>
            <Navbar />

            <Outlet />

            {!hideTestimonial && <Testimonial />}
            {!hideFooter && <Footer />}

         
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default LayOut;
