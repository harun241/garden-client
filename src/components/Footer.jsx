import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-black text-white py-10 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">


        <div className='flex '>
           <img
            className="w-10 h-10 rounded-full mr-2"
            src="https://i.ibb.co/xKCnLw6C/5532983.webp"
            alt="Logo"
          />
          <p className='text-green-400 font-bold'>Gardening</p>
         </div>


        <div className="min-w-[200px]">
          <h4 className="text-lg font-semibold border-b-2 border-green-500 pb-2 mb-3">Contact Info</h4>
          <p className="text-sm mb-1">Email: omdharun6@gmail.com</p>
          <p className="text-sm mb-1">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Address: Dhaka,Bangladesh</p>
        </div>

        
        
          
         
      
        

     
        <div className="min-w-[200px]">
          <h4 className="text-lg font-semibold border-b-2 border-green-500 pb-2 mb-3">Follow Us</h4>
          <div className="flex flex-col gap-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" text-white text-sm hover:underline">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" text-white text-sm hover:underline">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" text-white text-sm hover:underline">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className=" text-white text-sm hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} Gardening. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
