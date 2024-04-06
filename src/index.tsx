import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import {RegistroAprendiz} from './pages/RegistroAprendiz';
import { RegistrationStatusFormView } from './pages/RegistrationStatusFormView';
import { LoggedHome } from './pages/LoggedHome';
import { QRGeneratorView } from './pages/QRGeneratorView';
import { Dashboard } from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { PageNotFound } from './layout/404.tsx';
import { UserAdminSection } from './pages/userAdminSection.jsx';
import { UserListView } from './pages/UserListView.jsx';

const router = createBrowserRouter([

  {
    path: '/',
    element: <Home />,
    errorElement: <PageNotFound />
  },
  {
      path: '/registro-aprendiz',
      element: <RegistroAprendiz />
  },
  {
      path: '/estado-solicitud-registro',
      element: <RegistrationStatusFormView />
  },
  {
      path: '/qr-generator',
      element: <QRGeneratorView />
  },
  {
      path: '/',
      element: <ProtectedRoute/>,
      children:[
          {
            path: '/dashboard',
            element: <Dashboard />
        }
      ]
  },
  {
      path: '/',
      element: <ProtectedRoute/>,
      children:[
          {
            path: '/users-administration',
            element: <UserAdminSection/>
        }
      ]
  },
  {
    path: '/',
    element: <ProtectedRoute/>,
    children:[
        {
          path: '/users-administration-list',
          element: <UserListView/>
      }
    ]
  },
  {
    path: '/',
    element: <ProtectedRoute/>,
    children:[
      {
        path: '/home',
        element: <LoggedHome />
    }
  ]
  }
  

]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>     
    <AuthProvider>
      <RouterProvider router={router} />   
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();