import { useState, useEffect } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';

import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import './style.css';
import Cohorts from './cohorts';
import { useUserRoleData } from '../../context/userRole.';
import Students from './students';
import TeachersDashboard from './teachers';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import Search from './search';

const Dashboard = () => {
  const { token } = useAuth();
  
  // Safely decode token with fallback
  let decodedToken = {};
  try {
    if (token || localStorage.getItem('token')) {
      decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
    }
  } catch (error) {
    console.error('Invalid token in Dashboard:', error);
  }
  
  const fullName = `${decodedToken.firstName || decodedToken.first_name || 'Current'} ${decodedToken.lastName || decodedToken.last_name || 'User'}`;
  const initials = fullName?.match(/\b(\w)/g)?.join('') || 'NO';
  const  { userRole, setUserRole } = useUserRoleData();

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  useEffect(() => {
      setUserRole(decodedToken.roleId)
  })

/*  TODO TRIED ADDING CORRECT INITALS TO PROFILE CIRCLE, DIDN'T WORK 
useEffect(() => {
    async function fetchUser() {
      try {
        const { userId } = jwt_decode(token || localStorage.getItem('token')) || {};
        if (!userId) {
          console.log('Could not determine user. Please log in again.');
          return;
        }
      const fetchedUser = await get(`users/${userId}`);
      setUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser([]);
    }
    const authorName = post.user.profile
    ? `${post.user.profile.firstName || 'Unknown'} ${post.user.profile.lastName || 'User'}`
    : 'Unknown User';
    setUserInitials(authorName.match(/\b(\w)/g));
  }
      fetchUser();
    }, []); */

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>{initials}</p>
            </div>

            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Search />

        { userRole === 2 ? (
           <Card>
          <h4>My Cohort</h4>
        </Card>
        ) : (
          <>
          <Cohorts/>
          <Students/>
          <TeachersDashboard/>
          </>
        )}
       
      </aside>
    </>
  );
};

export default Dashboard;
