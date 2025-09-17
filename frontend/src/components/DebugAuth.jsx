import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DebugAuth = () => {
  const { user, token } = useAuth();

  useEffect(() => {
    console.log('Auth State:', { user, token });
    console.log('Local Storage Token:', localStorage.getItem('token'));
  }, [user, token]);

  return null;
};

export default DebugAuth;