import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Auth/Login.jsx";
import NotFound from "./views/NotFound";
import Signup from "./views/Auth/Signup.jsx";
import Users from "./views/User/Users.jsx";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
