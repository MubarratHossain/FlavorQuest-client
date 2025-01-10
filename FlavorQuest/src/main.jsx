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
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import AddFoods from './components/AddFoods/AddFoods.jsx';
import AllFoods from './components/AllFoods/AllFoods.jsx';
import Food from './components/Food/Food.jsx';
import Purchase from './components/Purchase/Purchase.jsx';
import MyFoods from './components/MyFoods/MyFoods.jsx';
import UpdateFood from './components/UpdateFood/UpdateFood.jsx';
import MyOrders from './components/MyOrders/MyOrders.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import OrderPage from './components/Order/OrderPage.jsx';
import TakeawayPage from './components/Takeway/TakeawayPage.jsx';
import DineInPage from './components/DineIn/DineIn.jsx';
import BookTable from './components/Booktable/Booktable.jsx';


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
      {
        path:'/addFoods',
        element:<PrivateRoute><AddFoods></AddFoods></PrivateRoute>,
      },
      {
        path:'/allFoods',
        element:<AllFoods></AllFoods>,
      },
      {
        path:'/food/:id',
        element:<Food></Food>,
      },
      {
        path:'/purchase/:id',
        element:<PrivateRoute><Purchase></Purchase></PrivateRoute>,
      },
      {
        path:'/myFoods',
        element:<PrivateRoute><MyFoods></MyFoods></PrivateRoute>,
      },
      {
        path:'/updateFood/:id',
        element:<PrivateRoute><UpdateFood></UpdateFood></PrivateRoute>,
      },
      {
        path:'/myOrders',
        element:<PrivateRoute><MyOrders></MyOrders></PrivateRoute>,
      },
      {
        path:'/gallery',
        element:<Gallery></Gallery>,
      },
      {
        path:'/order',
        element:<OrderPage></OrderPage>,
      },
      {
        path:'/takeaway',
        element:<TakeawayPage></TakeawayPage>,
      },
      {
        path:'/dineIn',
        element:<DineInPage></DineInPage>,
      },{
        path:'/bookTable',
        element:<BookTable></BookTable>,
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
