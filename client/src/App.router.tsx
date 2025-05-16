import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import App from "./App";
import Login from "./pages/Login";
import Profilepage from "./pages/Profilepage";
import UploadMeme from "./pages/UploadMeme";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/upload",
        element: <UploadMeme />,
      },
      {
        path: "/profile/:userId",
        element: <Profilepage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
