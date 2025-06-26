import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import ExploreGardeners from '../pages/ExploreGardeners';
import BrowseTips from '../pages/BrowseTips';
import UpdateTip from '../pages/UpdateTip';
import TipsDetails from '../pages/TipsDetails';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './provider/PrivateRoute';
import LayOut from '../Pages/LayOut';
import Login from '../Pages/Login';
import ShareGardenTip from '../Pages/ShareGardenTip';
import MyTips from '../pages/MyTips';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayOut />, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'sharedtip',
        element: (
          <PrivateRoute>
            <ShareGardenTip />
          </PrivateRoute>
        ),
      },
      {
        path: 'explore-gardeners',
        element: <ExploreGardeners />,
      },
      {
        path: 'browse-tips',
        element: <BrowseTips />,
      },
      {
        path: 'my-tips',
        element: (
          <PrivateRoute>
           <MyTips/>
          </PrivateRoute>
        ),
      },
      {
        path: 'tip/:id',
        element: (
          <PrivateRoute>
            <TipsDetails />
          </PrivateRoute>
        ),
      },
      {
         path: 'update-tip/:tipId', 
         element: (
    <PrivateRoute>
      <UpdateTip />
    </PrivateRoute>
  ),
},
    ],
  },
]);






