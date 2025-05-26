import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./shared/components/Header";
import { Toaster } from "react-hot-toast";
import { User } from "./shared/models/User.model";
import { useCallback, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "./shared/models/JWTPayload.model";
import { getUserData } from "./services/UserService";
import { UserContext } from "./shared/context/UserContext";

function App() {
  const location = useLocation();
  const [userData, setUserData] = useState<User | null>(null);
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  const changeUserDataContext = useCallback((user: User) => {
    setUserData(user);
  }, []);

  const fetchUserData = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<JWTPayload>(token);
      getUserData(decodedToken.user.id).then((response) =>
        setUserData(response.data)
      );
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{ user: userData, setUser: changeUserDataContext }}
      >
        {!hideHeader && <Header />}
        <Toaster />
        <Outlet />;
      </UserContext.Provider>
    </>
  );
}

export default App;
