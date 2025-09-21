import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DebugAuth = () => {
  const { user, token } = useAuth();

  useEffect(() => {
  }, [user, token]);

  return null;
};

export default DebugAuth;