import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

import Register from '../pages/Register';

import ExploreGardeners from '../pages/ExploreGardeners';
import BrowseTips from '../pages/BrowseTips';
import MyTips from '../pages/MyTips';
import UpdateTip from '../pages/UpdateTip';
import TipsDetails from '../pages/TipsDetails';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './provider/PrivateRoute';
import LayOut from '../Pages/LayOut';
import Login from '../Pages/Login';
import ShareGardenTip from '../Pages/ShareGardenTip';


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






/*
*➕ Share a Garden Tip (Private Route)
*
*
*
*
*
*
*
*
*
 */

// {
  //  path: '/CompanyInfo/:id',
  //  element: (
    //  <PrivateRoute>
      //  <CompanyInfo />
     // </PrivateRoute>
    //),
  //},
  //{
  //  path: '/auth',
   // Component: AuthLayout,
  //  children: [
   //   {
    //    path: '/auth/login',
    //    Component: Login,
    //  },
    //  {
      //  path: '/auth/register',
       // Component: Register,
      //},
    //  {
     //   path: '/auth/forgot-password',
     //   Component: ForgotPassword,
    //  }