import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ShareTip from '../pages/ShareTip';
import ExploreGardeners from '../pages/ExploreGardeners';
import BrowseTips from '../pages/BrowseTips';
import MyTips from '../pages/MyTips';
import UpdateTip from '../pages/UpdateTip';
import LayOut from '../pages/LayOut';
import TipsDetails from '../pages/TipsDetails';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './provider/PrivateRoute';

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
        path: 'share-tip',
        element: (
          <PrivateRoute>
            <ShareTip />
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
            <MyTips />
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
        path: 'update-tip/:id',
        element: (
          <PrivateRoute>
            <UpdateTip />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
