  import { createContext, useContext, useReducer, useEffect, useState } from 'react';
  import { toast } from 'react-hot-toast';
  import api from '../config/axios';

  const AuthContext = createContext();

  const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_START':
        return { ...state, loading: true, error: null };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'LOGOUT':
        return { ...state, user: null, token: null };
      case 'CLEAR_ERROR':
        return { ...state, error: null };
      case 'UPDATE_USER':
        return { ...state, user: action.payload };
      case 'SET_TOKEN':
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };

  export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: JSON.parse(localStorage.getItem('user')) || null,
      token: localStorage.getItem('token') || null,
      loading: false,
      error: null,
    });

    const [isAuthReady, setIsAuthReady] = useState(false); // NEW

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        verifyToken(token).finally(() => setIsAuthReady(true));
      } else {
        setIsAuthReady(true);
      }
    }, [state.token]);

    const verifyToken = async (token) => {
      try {
        const res = await api.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: res.data.user, token },
        });
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } catch (err) {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
    };

    // Login function supports admin login
    const login = async (email, password, isAdmin = false) => {
      dispatch({ type: 'LOGIN_START' });
      try {
        const endpoint = isAdmin ? '/api/admin/auth/login' : '/api/auth/login';
        const res = await api.post(endpoint, { email, password });
        const { token, user } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        toast.success('Login successful!');
      } catch (err) {
        const message = err.response?.data?.msg || 'Login failed';
        dispatch({ type: 'LOGIN_FAILURE', payload: message });
        toast.error(message);
      }
    };

    const register = async (name, email, password) => {
      dispatch({ type: 'LOGIN_START' });
      try {
        const res = await api.post('/api/auth/register', { name, email, password });
        const { token, user } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        toast.success('Registration successful!');
      } catch (err) {
        const message = err.response?.data?.msg || 'Registration failed';
        dispatch({ type: 'LOGIN_FAILURE', payload: message });
        toast.error(message);
      }
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    };

    const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

    const updateUser = (userData) => {
      dispatch({ type: 'UPDATE_USER', payload: userData });
      localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
      <AuthContext.Provider
        value={{
          ...state,
          login,
          register,
          logout,
          clearError,
          updateUser,
          isAuthReady, // NEW
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);