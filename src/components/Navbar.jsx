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

  const handleLogout = () => {
    signOut(auth).then(() => {
      setShowLogout(false);
      setMobileMenuOpen(false);
      navigate("/");
    });
  };

  const activeClassName = "border-b-2 border-green-700 text-green-900";
  const inactiveClassName = "text-green-800 hover:border-b-2 hover:border-green-500";

  return (
    <nav className="bg-green-100 shadow-md  top-0 left-0 right-0 ">
      <div className="w-11/12 mx-auto flex justify-between items-center h-20 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-800 dark:text-green-400 flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src="https://i.ibb.co/xKCnLw6C/5532983.webp"
            alt="Logo"
          />
          Gardening
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-green-800"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 font-medium ${isActive ? activeClassName : inactiveClassName}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/browse-tips"
            className={({ isActive }) =>
              `px-3 py-2 font-medium ${isActive ? activeClassName : inactiveClassName}`
            }
          >
            Browse Tips
          </NavLink>
          <NavLink
            to="/explore-gardeners"
            className={({ isActive }) =>
              `px-3 py-2 font-medium ${isActive ? activeClassName : inactiveClassName}`
            }
          >
            Explore Gardeners
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/sharedtip"
                className={({ isActive }) =>
                  `px-3 py-2 font-medium ${isActive ? activeClassName : inactiveClassName}`
                }
              >
                Share Tip
              </NavLink>
              <NavLink
                to="/my-tips"
                className={({ isActive }) =>
                  `px-3 py-2 font-medium ${isActive ? activeClassName : inactiveClassName}`
                }
              >
                My Tips
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side: Theme + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {!user ? (
            <NavLink to="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
              Login
            </NavLink>
          ) : (
            <div className="relative group inline-block cursor-pointer" onClick={() => setShowLogout(!showLogout)}>
              <img
                src={user.photoURL || "https://i.ibb.co/FKkzmYy/default-user.png"}
                alt="User"
                className="w-10 h-10 rounded-full border border-green-400"
              />
              <span className="absolute text-xs bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 dark:bg-white left-1 transform -translate-x-1/2 whitespace-nowrap">
                {user.displayName || user.email}
              </span>
              {showLogout && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-50">
                  <button onClick={handleLogout} className="text-red-600 hover:underline text-sm">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        
        {mobileMenuOpen && (
          <div className=" lg:hidden md:hidden bg-green-100 z-50 px-4 mt-24 border-t space-y-2 relative">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-green-800 ">
              Home
            </NavLink>
            <NavLink to="/browse-tips" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-green-800">
              Browse Tips
            </NavLink>
            <NavLink to="/explore-gardeners" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-green-800">
              Explore Gardeners
            </NavLink>
            {user && (
              <>
                <NavLink to="/sharedtip" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-green-800">
                  Share Tip
                </NavLink>
                <NavLink to="/my-tips" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-green-800">
                  My Tips
                </NavLink>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
            {!user ? (
              <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Login
              </NavLink>
            ) : (
              <button onClick={handleLogout} className="text-red-600 hover:underline text-sm">
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
