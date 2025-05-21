import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase.config";
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <nav className="bg-green-100 shadow-md px-4 py-3 max-w-11/12 mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">

      <Link to="/" className="text-2xl font-bold text-green-700 flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src="https://i.ibb.co/xKCnLw6C/5532983.webp"
          alt="Banana Garden Logo"
        />
        Banana Garden
      </Link>

  
      <button
        className="md:hidden text-green-700 focus:outline-none"
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

      {/* Menu Items */}
      <div
        className={`w-full md:w-auto flex flex-col md:flex-row gap-4 md:gap-6 mt-3 md:mt-0 ${
          mobileMenuOpen ? "block" : "hidden"
        } md:flex`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-700 underline"
              : "hover:text-green-600"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>

        {user && (
          <NavLink
            to="/sharedtip"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 underline"
                : "hover:text-green-600"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Share a Garden Tip
          </NavLink>
        )}

        <NavLink
          to="/explore-gardeners"
          className={({ isActive }) =>
            isActive
              ? "text-green-700 underline"
              : "hover:text-green-600"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Explore Gardeners
        </NavLink>

        {user && (
          <NavLink
            to="/my-tips"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 underline"
                : "hover:text-green-600"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            My Tips
          </NavLink>
        )}
      </div>


      <div className="relative mt-3 md:mt-0">
        {!user ? (
          <NavLink
            to="login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 block text-center md:inline-block"
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

            <span className="absolute left-1/2 -translate-x-1/2 mt-1 text-sm bg-white shadow px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
              {user.displayName}
            </span>

            {showLogout && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-20">
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
    </nav>
  );
};

export default Navbar;
