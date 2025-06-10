import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./shared/components/Header";
import { Toaster } from "react-hot-toast";
import { User } from "./shared/models/User.model";
import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./shared/context/UserContext";
import { logOut } from "./shared/utils/auth.utils";
import { logOutInterceptor } from "./axios/Interceptors";
import { JWTPayload } from "./shared/models/JWTPayload.model";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  const changeUserDataContext = useCallback((user: User | null) => {
    setUserData(user);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<JWTPayload>(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        logOut(navigate);
      } else {
        const user: User = {
          id: decodedToken.user.id,
          userName: decodedToken.user.userName,
          profileImage: decodedToken.user.profileImage,
        };
        setUserData(user);
      }
    }
  }, []);

  useEffect(() => {
    ////console.log"User data context updated:", userData);
  }, [userData]);

  useEffect(() => {
    logOutInterceptor(navigate);
  }, [navigate]);

  return (
    <>
      <UserContext.Provider
        value={{ user: userData, setUser: changeUserDataContext }}
      >
        {!hideHeader && <Header />}
        <Toaster />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
