import { createContext, useState, useContext, useEffect } from 'react';
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error ("useAth debe estar dentro de un Provider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signUp = async (user) => {
    try {
      await registerRequest(user);
      return { success: true, message: "Usuario registrado exitosamente" };
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      return res.data
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(()=> {
    async function checkLogin () {
    const cookies = Cookies.get()
    if(!cookies.token){
      setUser(null);
      setIsAuthenticated(false)
      return;
    }
      try {
        const res = await verifyTokenRequest(cookies.token)
        if (res.data) {
          setIsAuthenticated(true)
          setUser(res.data);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false)
      }
    }
  checkLogin()
  },[isAuthenticated])


  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signUp,
      login,
      logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};