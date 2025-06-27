import { useAuth } from "../../components/Authcontext";

const DashBoardOverView = () => {
  const { user } = useAuth(); // logged-in user
  // Dummy counts – replace with API calls
  const totalItems = 50;
  const myItems = 12;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName || "User"}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold">Total Items</h3>
          <p className="text-3xl text-green-600">{totalItems}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold">My Items</h3>
          <p className="text-3xl text-blue-600">{myItems}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold">User Email</h3>
          <p className="text-md text-gray-700">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardOverView;
