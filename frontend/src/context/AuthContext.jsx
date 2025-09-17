import { createContext, useContext, useReducer, useEffect } from 'react';
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
        error: null 
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
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  });

  useEffect(() => {
    if (state.token) {
      verifyToken();
    }
  }, [state.token]);

  const verifyToken = async () => {
    try {
      const response = await api.get('/api/auth/verify');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: state.token
        }
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
      toast.success('Login successful!');
    } catch (error) {
      const message = error.response?.data?.msg || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      toast.error(message);
    }
  };

  const register = async (name, email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
      toast.success('Registration successful!');
    } catch (error) {
      const message = error.response?.data?.msg || 'Registration failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      toast.error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      loading: state.loading,
      error: state.error,
      login,
      register,
      logout,
      clearError,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);