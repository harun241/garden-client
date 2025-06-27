import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-green-100 p-4 space-y-3">
        <h2 className="text-xl font-bold text-green-800">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" end className="text-green-700">Overview</NavLink>
          <NavLink to="/dashboard/browse-tips" className="text-green-700">Browse-tips</NavLink>
           <NavLink to="/dashboard/my-tips" className="text-green-700">My Tips</NavLink>
            <NavLink to="/dashboard/sharedtip" className="text-green-700">Shared Tip</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 mt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
