import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';
import Testimonial from '../components/Tesimonials';
import Navbar from '../components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import Chatbot from '../components/Chatbot';

const LayOut = () => {
    const location = useLocation();

    const hideTestimonial = location.pathname === '/login' || location.pathname === '/register';
    const hideFooter = location.pathname === '/login' || location.pathname === '/register';

    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const pageTransition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.5
    };

    return (
        <div className='relative'>
            <Navbar toggleTheme={toggleTheme} theme={theme} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>

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
            <Chatbot></Chatbot>
        </div>
    );
};

export default LayOut;
