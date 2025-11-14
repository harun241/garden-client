import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeClass =
    "font-semibold text-white bg-green-600 px-4 py-2 rounded-lg transition";
  const inactiveClass =
    "text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg transition";

  return (
    <div className="min-h-screen flex mt-16 relative">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-green-100 p-6 w-64  transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative shadow-lg`}
      >
        <h2 className="text-2xl font-bold text-green-800 mb-8">🌿 Dashboard</h2>
        <nav className="flex flex-col ">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
            onClick={() => setSidebarOpen(false)}
          >
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/browse-tips"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
            onClick={() => setSidebarOpen(false)}
          >
            Browse Tips
          </NavLink>
          <NavLink
            to="/dashboard/my-tips"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
            onClick={() => setSidebarOpen(false)}
          >
            My Tips
          </NavLink>
          <NavLink
            to="/dashboard/sharedtip"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
            onClick={() => setSidebarOpen(false)}
          >
            Shared Tip
          </NavLink>
        </nav>

        <div className="mt-8 border-t border-green-300 pt-4">
          <Link
            to="/profile"
            className="text-green-800 font-medium hover:text-green-600"
          >
            Profile
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1  md:ml-64 min-h-screen relative">
        {/* Mobile Hamburger Button */}
        <button
          className="fixed top-20 left-4 md:hidden z-50 p-2 rounded-md bg-green-600 text-white shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

 <main className="flex-1 md:ml-64 min-h-screen relative">

  {/* Scrollable Outlet Area */}
  <div
    className="p-6 bg-white rounded-xl shadow-sm mx-auto mt-6 md:mt-4 
    h-[calc(100vh-120px)] overflow-y-auto"
  >
    <Outlet />
  </div>

</main>


      </main>
    </div>
  );
};

export default DashboardLayout;
