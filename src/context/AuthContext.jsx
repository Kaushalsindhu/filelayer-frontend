import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({isOpen: false,mode: "login",});

  const openLogin = () => setAuthModal({ isOpen: true, mode: "login" });
  const openSignup = () => setAuthModal({ isOpen: true, mode: "signup" });
  const closeAuthModal = () => setAuthModal((prev) => ({ ...prev, isOpen: false }));

  const login = (data) => {
    localStorage.setItem("token", data.token);
    console.log("LS TOKEN : " + localStorage.getItem("token"));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      } 

      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (err) {
        console.log("Auth context ERROR:", err.response?.data || err.message);
        logout(); // token invalid
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      authModal,
      openLogin,
      openSignup,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
