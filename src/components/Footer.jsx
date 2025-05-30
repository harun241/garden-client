import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-[#ecf0f1] py-10 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Contact Info */}
        <div className="min-w-[200px]">
          <h4 className="text-lg font-semibold border-b-2 border-green-500 pb-2 mb-3">Contact Info</h4>
          <p className="text-sm mb-1">Email: support@yourdomain.com</p>
          <p className="text-sm mb-1">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Address: 123 Garden St, Plant City</p>
        </div>

        {/* Terms */}
        <div className="min-w-[200px]">
          <h4 className="text-lg font-semibold border-b-2 border-green-500 pb-2 mb-3">Terms</h4>
          <a href="/terms" className="text-green-400 text-sm block mb-1 hover:underline">Terms of Service</a>
          <a href="/privacy" className="text-green-400 text-sm block hover:underline">Privacy Policy</a>
        </div>

        {/* Social Links */}
        <div className="min-w-[200px]">
          <h4 className="text-lg font-semibold border-b-2 border-green-500 pb-2 mb-3">Follow Us</h4>
          <div className="flex flex-col gap-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 text-sm hover:underline">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 text-sm hover:underline">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 text-sm hover:underline">Instagram</a>
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
