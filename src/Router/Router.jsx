import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ShareTip from '../pages/ShareTip';
import ExploreGardeners from '../pages/ExploreGardeners';
import BrowseTips from '../pages/BrowseTips';
import MyTips from '../pages/MyTips';
import UpdateTip from '../pages/UpdateTip';
import LayOut from '../Pages/LayOut';
import TipsDetails from '../Pages/TipsDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    Component:  LayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'share-tip',
        Component: () => (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        ),
      },
      {
        path: 'explore-gardeners',
        Component: ExploreGardeners,
      },
      {
        path: 'browse-tips',
        Component: BrowseTips,
      },
      {
        path: 'my-tips',
        Component: () => (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
      {
        path: 'tip/:id',
        Component:TipsDetails,
      },
      {
        path: 'update-tip/:id',
        Component: () => (
          <PrivateRoute>
            <UpdateTip />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
