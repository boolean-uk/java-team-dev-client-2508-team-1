import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/header';
import Modal from '../components/modal';
import Navigation from '../components/navigation';
import useAuth from '../hooks/useAuth';
import { createNewStudent, createProfile, login, refreshToken, register, getUserById } from '../service/apiClient';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [user] = useState(null);
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem('userPhoto'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedPhoto = localStorage.getItem('userPhoto');

    if (storedToken && !token) {
      setToken(storedToken);
      navigate(location.state?.from?.pathname || '/');
    }

    // Set the user photo if it exists in localStorage
    if (storedPhoto && !userPhoto) {
      setUserPhoto(storedPhoto);
    }
  }, [location.state?.from?.pathname, navigate, token, userPhoto]);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);

    if (!res.data.token) {
      return navigate('/login');
    }

    localStorage.setItem('token', res.data.token);

    setToken(res.data.token);

    navigate(location.state?.from?.pathname || '/');  

    // After successful login, fetch and store user data
    try {
      const { userId } = jwt_decode(res.data.token);
      const userData = await getUserById(userId);
      const photo = userData.data.user.profile?.photo;
      
      // Only update localStorage and state if we got a photo from the server
      // This preserves any photo that might already be stored from registration
      if (photo) {
        localStorage.setItem('userPhoto', photo);
        setUserPhoto(photo);
      } else {
        // If no photo from server, check if we already have one in localStorage
        const existingPhoto = localStorage.getItem('userPhoto');
        if (existingPhoto) {
          setUserPhoto(existingPhoto);
        }
      }
    } catch (error) {
      console.error('Error fetching user photo:', error);
      // If there's an error fetching from server, try to use existing localStorage photo
      const existingPhoto = localStorage.getItem('userPhoto');
      if (existingPhoto) {
        setUserPhoto(existingPhoto);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userPhoto');
    setToken(null);
    setUserPhoto(null);
  };

  // Force a token refresh by setting the token again to trigger useEffect in other contexts
  const forceTokenRefresh = () => {
    const currentToken = token || localStorage.getItem('token');
    if (currentToken) {
      // Force re-render and context updates by setting token again
      setToken(null);

      setTimeout(() => {
        setToken(currentToken);
      }, 100);
    }
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

    try {
      const response = await createProfile(userId, first_name, last_name, username, github_username, mobile, bio, role, specialism, cohort, start_date, end_date, photo);
      
      // Always store the photo in localStorage if provided, regardless of token response
      if (photo) {
        localStorage.setItem('userPhoto', photo);
        setUserPhoto(photo);
      }
      
      // Check if the backend returned a new token with updated user info
      if (response.data?.token) {
        // Use the new token from the response
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      } else {
        // Try to refresh the token to get updated user information
        try {
          const refreshResponse = await refreshToken();
          if (refreshResponse.token) {
            localStorage.setItem('token', refreshResponse.token);
            setToken(refreshResponse.token);
          } else {
            // If token refresh is not available, force a refresh of contexts
            forceTokenRefresh();
          }

        } catch (refreshError) {
          console.error('Token refresh not available, forcing context refresh');
          // Force a refresh of all contexts that depend on the token
          forceTokenRefresh();
        }
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  const handleCreateNewStudent = async (first_name, last_name, username, github_username, email, mobile, password, bio, role, specialism, cohort, photo) => {

    await createNewStudent(first_name, last_name, username, github_username, email, mobile, password, bio, role, specialism, cohort, photo);

    // Store the photo in localStorage if it was provided during student creation
    if (photo) {
      localStorage.setItem('userPhoto', photo);
      setUserPhoto(photo);
    }

    localStorage.setItem('token', token);
    navigate('/cohorts');
  };

  const value = {
    token,
    user,
    userPhoto,
    setUserPhoto,
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
