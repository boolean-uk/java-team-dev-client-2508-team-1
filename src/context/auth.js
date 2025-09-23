import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/header';
import Modal from '../components/modal';
import Navigation from '../components/navigation';
import useAuth from '../hooks/useAuth';
import { createNewStudent, createProfile, login, register } from '../service/apiClient';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken && !token) {
      setToken(storedToken);
      navigate(location.state?.from?.pathname || '/');
    }
  }, [location.state?.from?.pathname, navigate]);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);

    if (!res.data.token) {
      return navigate('/login');
    }

    localStorage.setItem('token', res.data.token);

    setToken(res.data.token);
    navigate(location.state?.from?.pathname || '/');  
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleRegister = async (email, password) => {
    const res = await register(email, password);
    
    localStorage.setItem('token', res.data.token);

    setToken(res.data.token);
    navigate('/verification');
  };

  /* eslint-disable camelcase */
  const handleCreateProfile = async (first_name, last_name, username, github_username, mobile, bio, role, specialism, cohort, start_date, end_date, photo) => {
    const { userId } = jwt_decode(token);

    await createProfile(userId, first_name, last_name, username, github_username, mobile, bio, role, specialism, cohort, start_date, end_date, photo);

    localStorage.setItem('token', token);
    navigate('/');
  };

  const handleCreateNewStudent = async (first_name, last_name, username, github_username, email, mobile, password, bio, role, specialism, cohort, start_date, end_date, photo) => {

    await createNewStudent(first_name, last_name, username, github_username, email, mobile, password, bio, role, specialism, cohort, start_date, end_date, photo);

    localStorage.setItem('token', token);
    navigate('/');
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile,
    onCreateNewStudent: handleCreateNewStudent
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
