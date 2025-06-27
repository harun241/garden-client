import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-green-100 p-4 space-y-3">
        <h2 className="text-xl font-bold text-green-800">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" end className="text-green-700">Overview</NavLink>
<<<<<<< HEAD
          <NavLink to="/dashboard/browse-tips" className="text-green-700">Browse-tips</NavLink>
=======
          <NavLink to="/dashboard/all-items" className="text-green-700">All Items</NavLink>
          <NavLink to="/dashboard/add-item" className="text-green-700">Add Item</NavLink>
          <NavLink to="/dashboard/my-items" className="text-green-700">My Items</NavLink>
>>>>>>> 1572dfb00fdf753f9cd359b59d35ebe4bdd06b93
           <NavLink to="/dashboard/my-tips" className="text-green-700">My Tips</NavLink>
            <NavLink to="/dashboard/sharedtip" className="text-green-700">Shared Tip</NavLink>
        </nav>
      </aside>
<<<<<<< HEAD
      <main className="flex-1 p-6 bg-gray-50 mt-10">
=======
      <main className="flex-1 p-6 bg-gray-50">
>>>>>>> 1572dfb00fdf753f9cd359b59d35ebe4bdd06b93
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
