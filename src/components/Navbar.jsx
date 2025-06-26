import React, { useState } from "react";
import { signOut } from "firebase/auth";
import auth from "../Firebase.config";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Authcontext";

const Navbar = ({ toggleTheme, theme }) => {
  const { user } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
const [imgLoaded, setImgLoaded] = useState(false);
  const handleLogout = () => {
    signOut(auth).then(() => {
      setShowLogout(false);
      setMobileMenuOpen(false);
      navigate("/");
    });
  };

  // NavLink এ active class যুক্ত করার জন্য একটা function
  const activeClassName = "border-b-2 border-green-700 text-green-900";
  const inactiveClassName = "text-green-800 hover:border-b-2 hover:border-green-500";

  return (
    <nav className="bg-green-100 h-20 shadow-md px-4 py-3 mt-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-800 dark:text-green-400 flex items-center"
        >
          <img
            className="w-10 h-10 rounded-full mr-2"
            src="https://i.ibb.co/xKCnLw6C/5532983.webp"
            alt="Logo"
          />
          Gardening
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Middle: Nav Links */}
        <div
          className={`flex-1 md:flex md:items-center md:gap-6 justify-center ${
            mobileMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link px-3 py-2 font-medium ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/browse-tips"
            className={({ isActive }) =>
              `nav-link px-3 py-2 font-medium ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            Browse Tips
          </NavLink>
          <NavLink
            to="/explore-gardeners"
            className={({ isActive }) =>
              `nav-link px-3 py-2 font-medium ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            Explore Gardeners
          </NavLink>

          {user && (
            <>
              <span
                onClick={() => navigate("/sharedtip")}
                className="nav-link cursor-pointer px-3 py-2 font-medium text-green-800 hover:border-b-2 hover:border-green-500"
              >
                Share a Garden Tip
              </span>
              <span
                onClick={() => navigate("/my-tips")}
                className="nav-link cursor-pointer px-3 py-2 font-medium text-green-800 hover:border-b-2 hover:border-green-500"
              >
                My Tips
              </span>
            </>
          )}
        </div>

        {/* Right: Theme + Auth */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>

          {!user ? (
            <NavLink
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Login
            </NavLink>
          ) : (
            <div
              className="relative group inline-block cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            >
              <img
                src={
                  user.photoURL || "https://i.ibb.co/FKkzmYy/default-user.png"
                }
                alt="User"
                className="w-10 h-10 rounded-full border border-green-400"
              />
              <span className="absolute text-sm bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 dark:bg-white left-1 transform  ">
                {user.displayName || user.email}
              </span>
              {showLogout && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-20 ">
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
