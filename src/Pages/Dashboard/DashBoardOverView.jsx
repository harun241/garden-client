import { useAuth } from "../../components/Authcontext";

const DashBoardOverView = () => {
  const { user } = useAuth();

  const totalItems = 50;
  const myItems = 12;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-600">Welcome ,{user?.displayName || "User"}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold text-green-700">Total Items</h3>
          <p className="text-3xl text-blue-600 ">{totalItems}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold text-green-700">My Items</h3>
          <p className="text-3xl text-blue-600">{myItems}</p>
        </div>
        <div className="p-4 bg-white rounded shadow ">
          <h3 className="text-xl font-semibold text-green-700">User Email</h3>
          <p className="text-md text-blue-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardOverView;
