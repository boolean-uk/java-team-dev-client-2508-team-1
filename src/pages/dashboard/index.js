import { useEffect, useRef, useState } from 'react';
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

const Dashboard = () => {
  const onPostAddedRef = useRef(null);
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
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
  setUserRole(decodedToken.roleId)

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal onPostAdded={handlePostAdded} />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  const handlePostAdded = (newPost) => {
    // Call the Posts component's add function
    if (onPostAddedRef.current) {
      onPostAddedRef.current(newPost);
    }
  };

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

        <Posts onPostAdded={onPostAddedRef} />
      </main>

      <aside>
        <Search />

        { userRole === 2 ? (
           <Card>
          <h4>My Cohort</h4>
          <p>{course.name}</p>
          {students.map((student) => (
            <Student
              key={student.id || 0}
              id ={student.id}
              initials={`${student.firstName} ${student.lastName}`
                  .trim()
                  .split(/\s+/)
                  .map(word => word[0].toUpperCase())
                  .join('')}
              firstName={student.firstName}
              lastName={student.lastName}
            />
          ))}
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
