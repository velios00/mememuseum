import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./shared/components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeader && <Header />}
      <Toaster />
      <Outlet />;
    </>
  );
}

export default App;
