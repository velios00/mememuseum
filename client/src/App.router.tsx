import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import App from "./App";
import Login from "./pages/Login";
import Profilepage from "./pages/Profilepage";
import UploadMeme from "./pages/UploadMeme";
import MemeOfTheDay from "./pages/MemeOfTheDay";
import AuthGuard from "./shared/components/AuthGuard";

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
        element: (
          <AuthGuard isProtected>
            <UploadMeme />
          </AuthGuard>
        ),
      },
      {
        path: "/profile/:userId",
        element: <Profilepage />,
      },
      {
        path: "/meme-of-the-day",
        element: <MemeOfTheDay />,
      },
      {
        path: "/register",
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
    ],
  },
]);
