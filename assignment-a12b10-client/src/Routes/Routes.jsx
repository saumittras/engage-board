import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboars from "../Layout/Dashboars";
import AddPost from "../pages/Dashboard/User/AddPost";
import MyPosts from "../pages/Dashboard/User/MyPosts";
import PostDetails from "../pages/PostDetails/PostDetails";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import MakeAnnouncements from "../pages/Dashboard/Admin/MakeAnnouncements";
import PrivateRoute from "./PrivateRoute";
import Reports from "../pages/Dashboard/Admin/Reports";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "post/:id",
        element: <PostDetails></PostDetails>,
        loader: ({ params }) =>
          fetch(
            `https://assignment-a12b10-server.vercel.app/post/${params.id}`
          ),
      },
      {
        path: "details/:id",
        element: <PostDetails></PostDetails>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboars></Dashboars>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addpost",
        element: (
          <PrivateRoute>
            <AddPost></AddPost>
          </PrivateRoute>
        ),
      },
      {
        path: "mypost",
        element: (
          <PrivateRoute>
            <MyPosts></MyPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "announcement",
        element: <MakeAnnouncements />,
      },
      {
        path: "reports",
        element: (
          <PrivateRoute>
            <Reports></Reports>
          </PrivateRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <PrivateRoute>
            <AdminProfile></AdminProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
