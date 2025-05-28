import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../shared/context/UserContext";

export default function useAuth() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); // aggiorna il context globalmente
    navigate("/login");
  };

  return { user, setUser, logout };
}
