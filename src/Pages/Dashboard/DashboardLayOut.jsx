import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active class for NavLink
  const activeClass = "font-semibold text-green-900";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-green-100 p-4 space-y-3 w-64 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        `}
      >
        <h2 className="text-xl font-bold text-green-800 mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? activeClass : "text-green-700")}
            onClick={() => setSidebarOpen(false)}
          >
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/browse-tips"
            className={({ isActive }) => (isActive ? activeClass : "text-green-700")}
            onClick={() => setSidebarOpen(false)}
          >
            Browse Tips
          </NavLink>
          <NavLink
            to="/dashboard/my-tips"
            className={({ isActive }) => (isActive ? activeClass : "text-green-700")}
            onClick={() => setSidebarOpen(false)}
          >
            My Tips
          </NavLink>
          <NavLink
            to="/dashboard/sharedtip"
            className={({ isActive }) => (isActive ? activeClass : "text-green-700")}
            onClick={() => setSidebarOpen(false)}
          >
            Shared Tip
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 md:ml-64 mt-16 md:mt-0">
        {/* Mobile hamburger button */}
        <button
          className="fixed top-4 left-4 md:hidden z-50 p-2 rounded-md bg-green-600 text-white focus:outline-none"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
