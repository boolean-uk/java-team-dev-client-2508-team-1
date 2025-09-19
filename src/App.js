import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import Welcome from './pages/welcome';
import { FormProvider } from './context/form';
import Cohort from './pages/cohort';
import ProfilePage from './pages/profile';
import { UserRoleProvider } from './context/userRole.';
import EditPage from './pages/edit';
import SearchPage from './pages/search';
import { SearchResultsProvider } from './context/searchResults';

const App = () => {
  return (
    <>
      <AuthProvider>
        <FormProvider>
        <UserRoleProvider>
        <SearchResultsProvider>
        <ModalProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="loading" element={<Loading />} />
            <Route path="verification" element={<Verification />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="welcome"
              element={
                <ProtectedRoute disabledNav={true}>
                  <Welcome />
                </ProtectedRoute>
              }
            />
            <Route
              path="cohorts"
              element={
                <ProtectedRoute>
                  <Cohort />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:userId/edit"
              element={
                <ProtectedRoute>
                  <EditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="search/profiles"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ModalProvider>
        </SearchResultsProvider>
        </UserRoleProvider>
        </FormProvider>
      </AuthProvider>
    </>
  );
};

export default App;
