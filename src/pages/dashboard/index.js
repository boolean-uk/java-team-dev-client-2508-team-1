

import { useState, useRef, useEffect } from 'react';

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
import Student from '../cohort/students/student';
import { getUserById, get } from '../../service/apiClient';
import UserIcon from '../../components/profile-icon';

const Dashboard = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [course, setCourse] = useState([]);
  
  // Safely decode token with fallback
  let decodedToken = {};
  try {
    if (token || localStorage.getItem('token')) {
      decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
    }
  } catch (error) {
    console.error('Invalid token in Dashboard:', error);
  }

  // to view people My Cohort
  useEffect(() => {
    async function fetchCohortData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found.');
          return;
        }
                        
        let userId;
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.userId;
        } catch (decodeError) {
            console.error('Invalid token:', decodeError);
            return;
        }
        
        const user = await getUserById(userId);
        const data = await get(`cohorts/${user.profile.cohort.id}`);

        setCohort(data.data.cohort)
        setCourse(data.data.cohort);
        setStudents(data.data.cohort.profiles)

      } catch (error) {
        console.error('fetchCohortData() in dashboard/index.js:', error);
      }
    }
    fetchCohortData();
  }, []);
  
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
    async function fetchAndSetUserRole() {
      const storedToken = token || localStorage.getItem('token');
      if (!storedToken) return;
      try {
        const decoded = jwtDecode(storedToken);
        const user = await getUserById(decoded.userId);
        // Sjekk rollen fra backend
        const roleName = user.profile.role.name;
        if (roleName === 'ROLE_TEACHER') setUserRole(1);
        else if (roleName === 'ROLE_STUDENT') setUserRole(2);
        else setUserRole(null);
      } catch (error) {
        console.error('Error fetching user role from backend:', error);
      }
    }
    fetchAndSetUserRole();
  }, [token, setUserRole]);

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
        { userRole === null || userRole === undefined ? (
          <div>Loading...</div>
        ) : (
          userRole === 2 ? (
            <Card>
              <h3>My Cohort</h3>
              <p className='padding-top'>{course.name}, Cohort {cohort.id}</p>
              <section className='cohort-teachers-container border-top'>
                
                {students.map((student) => (
                  <UserIcon
                    key={student.id}
                    id={student.id}
                    initials={`${student.firstName} ${student.lastName}`
                        .trim()
                        .split(/\s+/)
                        .map(word => word[0].toUpperCase())
                        .join('')}
                    firstname={student.firstName}
                    lastname={student.lastName}
                  />
                ))}
              </section>
            </Card>
          ) : (
            <>
              <Cohorts/>
              <Students/>
              <TeachersDashboard/>
            </>
          )
        )}
         
      </aside>
    </>
  );
};

export default Dashboard;
