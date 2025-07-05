import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./Authcontext";
import { signOut } from "firebase/auth";
import auth from "../Firebase.config";

const Navbar = ({ toggleTheme, theme }) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const containerRef = useRef(null);

  const activeClassName = "border-b-2 border-green-700 text-green-900";
  const inactiveClassName = "text-green-800 hover:border-b-2 hover:border-green-500";

  const handleLogout = () => {
    signOut(auth).then(() => {
      setShowLogout(false);
      setMobileMenuOpen(false);
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-[9999] h-16 flex items-center justify-between px-4">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <img className="w-10 h-10 rounded-full mr-2" src="https://i.ibb.co/xKCnLw6C/5532983.webp" alt="Logo" />
            <span className="text-2xl font-bold text-green-800 dark:text-green-400">Gardening</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 items-center">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/browse-tips" className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Browse Tips</NavLink>
          </li>
          <li>
            <NavLink to="/explore-gardeners" className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Explore Gardeners</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/dashboard/sharedtip" className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Share Tip</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-tips" className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>My Tips</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="text-green-800 font-medium">Dashboard</NavLink>
              </li>
            </>
          )}
          <li>
            <button onClick={toggleTheme} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </li>
        </ul>

        {/* Right: User Info / Login */}
        <div className="flex items-center space-x-3" ref={containerRef}>
          {user ? (
            <>
              <div className="flex items-center cursor-pointer select-none" onClick={() => setShowLogout((prev) => !prev)}>
                <img src={user.photoURL || "https://i.ibb.co/FKkzmYy/default-user.png"} alt="User" className="w-10 h-10 rounded-full border border-green-400" />
                <span className="ml-2 text-green-800 dark:text-green-400 hidden lg:inline-block">
                  {user.displayName || user.email}
                </span>
              </div>
              {showLogout && (
                <div className="absolute top-14 right-4 w-32 bg-white dark:bg-gray-800 border border-gray-200 rounded shadow p-2 z-50">
                  <button onClick={handleLogout} className="text-red-600 hover:underline text-sm w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md lg:hidden z-[9998] transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-y-0 opacity-100 max-h-[80vh] overflow-auto" : "translate-y-[-100%] opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/browse-tips" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Browse Tips</NavLink>
          </li>
          <li>
            <NavLink to="/explore-gardeners" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Explore Gardeners</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/dashboard/sharedtip" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>Share Tip</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-tips" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}>My Tips</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-green-800 font-medium">Dashboard</NavLink>
              </li>
            </>
          )}
          <li>
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm w-full"
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </li>
        </ul>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
    </>
  );
};

export default Navbar;
