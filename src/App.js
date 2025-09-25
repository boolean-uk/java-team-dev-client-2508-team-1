import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import { PostsProvider } from './context/posts';
import { CommentsProvider } from './context/comments';
import Welcome from './pages/welcome';
import { FormProvider } from './context/form';
import Cohort from './pages/cohort';
import ProfilePage from './pages/profile';
import { UserRoleProvider } from './context/userRole.';
import EditPage from './pages/edit';
import SearchPage from './pages/search';
import { SearchResultsProvider } from './context/searchResults';
import AddStudent from './pages/addStudent';
import AddCohort from './pages/addCohort';

import NewStudent from './pages/cohort/newStudent';
import AddStudent from './pages/addStudent';
import EditCohort from './pages/editCohort';


const App = () => {
  return (
    <>
      <AuthProvider>
        <FormProvider>
          <UserRoleProvider>
           <SearchResultsProvider>
            <PostsProvider>
              <CommentsProvider>
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
                    path="cohorts/add"
                    element={
                      <ProtectedRoute>
                        <AddStudent />
                      </ProtectedRoute>
                    }/>
                    <Route 
                    path="cohorts/new"
                    element={
                      <ProtectedRoute>
                        <AddCohort/>
                      </ProtectedRoute>
                    }/>

                    <Route
                      path="cohorts/newStudent"
                      element={
                        <ProtectedRoute>
                          <NewStudent />
                        </ProtectedRoute>
                      }
                    />

                    <Route 
                    path="cohorts/add"
                    element={
                      <ProtectedRoute>
                        <AddStudent />
                      </ProtectedRoute>
                    }/>
                      <Route 
                        path="cohorts/:id/edit"
                        element={
                          <ProtectedRoute>
                            <EditCohort/>
                          </ProtectedRoute>
                        }/>
                    <Route
                      path="profile"
                      element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                      }
                    />
                    <Route
                      path="profile/:id"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="profile/:id/edit"
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
              </CommentsProvider>
            </PostsProvider>
           </SearchResultsProvider>
          </UserRoleProvider>
        </FormProvider>
      </AuthProvider>
    </>
  );
};

export default App;
