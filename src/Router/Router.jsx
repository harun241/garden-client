import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import ExploreGardeners from "../pages/ExploreGardeners";
import BrowseTips from "../pages/BrowseTips";
import UpdateTip from "../pages/UpdateTip";
import TipsDetails from "../pages/TipsDetails";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./provider/PrivateRoute";
import LayOut from "../pages/LayOut";
import Login from "../pages/Login";
import ShareGardenTip from "../pages/ShareGardenTip";
import MyTips from "../pages/MyTips";
import DashboardLayout from "../Pages/Dashboard/DashboardLayOut";
import DashBoardOverView from "../Pages/Dashboard/DashBoardOverView";
import AllItems from "../Pages/Dashboard/AllItems";
import AddItem from "../Pages/Dashboard/AddItems";
import MyItems from "../Pages/Dashboard/MyItems";
import UpdateTipPage from "../pages/UpdateTip";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      
      { path: "explore-gardeners", element: <ExploreGardeners /> },

     
      {
        path: "tip/:id",
        element: (
          <PrivateRoute>
            <TipsDetails />
          </PrivateRoute>
        ),
      },
      { 
  path: "update-tip/:id", 
  element: (
    <PrivateRoute>
      <UpdateTipPage />
    </PrivateRoute>
  ) 
},
     
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashBoardOverView /> },
          { path: "all-items", element: <AllItems /> },
          { path: "add-item", element: <AddItem /> },
          { path: "my-items", element: <MyItems /> },
           { path: "browse-tips", element: <BrowseTips /> },
           {
        path: "my-tips",
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
        {
        path: "sharedtip",
        element: (
          <PrivateRoute>
            <ShareGardenTip />
          </PrivateRoute>
        ),
      },
        ],
      },
    ],
  },
]);
