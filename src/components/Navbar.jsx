import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase.config";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ toggleTheme, theme }) => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setShowLogout(false);
      setMobileMenuOpen(false);
    });
  };

  const handlePrivateNavClick = (path) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-green-100 dark:bg-gray-900 shadow-md px-4 py-3 max-w-11/12 mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-700 dark:text-green-400 flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src="https://i.ibb.co/xKCnLw6C/5532983.webp"
          alt="Banana Garden Logo"
        />
        Banana Garden
      </Link>

      <button
        className="md:hidden text-green-700 dark:text-green-300 focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        className={`w-full md:w-auto flex flex-col md:flex-row gap-4 md:gap-6 mt-3 md:mt-0 ${
          mobileMenuOpen ? "block" : "hidden"
        } md:flex`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-700 dark:text-green-400 underline"
              : "hover:text-green-600 dark:hover:text-green-300 text-gray-800 dark:text-gray-200"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/browse-tips"
          className={({ isActive }) =>
            isActive
              ? "text-green-700 dark:text-green-400 underline"
              : "hover:text-green-600 dark:hover:text-green-300 text-gray-800 dark:text-gray-200"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Browse Tips
        </NavLink>

        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            handlePrivateNavClick('/sharedtip');
            setMobileMenuOpen(false);
          }}
          className="hover:text-green-600 dark:hover:text-green-300 cursor-pointer text-gray-800 dark:text-gray-200"
        >
          Share a Garden Tip
        </a>

        <NavLink
          to="/explore-gardeners"
          className={({ isActive }) =>
            isActive
              ? "text-green-700 dark:text-green-400 underline"
              : "hover:text-green-600 dark:hover:text-green-300 text-gray-800 dark:text-gray-200"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Explore Gardeners
        </NavLink>

        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            handlePrivateNavClick('/my-tips');
            setMobileMenuOpen(false);
          }}
          className="hover:text-green-600 dark:hover:text-green-300 cursor-pointer text-gray-800 dark:text-gray-200"
        >
          My Tips
        </a>

        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
        >
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <div className="relative mt-3 md:mt-0">
        {!user ? (
          <NavLink
            to="login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 block text-center md:inline-block dark:bg-green-500 dark:hover:bg-green-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </NavLink>
        ) : (
          <div
            className="relative group inline-block cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          >
            <img
              src={user.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border border-green-400"
            />
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-sm bg-white shadow px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap dark:bg-gray-700 dark:text-gray-100">
              {user.displayName}
            </span>
            {showLogout && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-20 dark:bg-gray-800 dark:border-gray-600">
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline dark:text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
