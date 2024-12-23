import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Authprovider from './components/Authprovider/Authprovider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      }, 
      {
        path:'/login',
        element:<Login></Login>,
      }, 
      {
        path:'/register',
        element:<Register></Register>,
      },
     
    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <Authprovider>
    <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>
  </Authprovider>,
)
