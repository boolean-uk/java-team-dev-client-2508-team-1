

import { useState, useEffect } from 'react';



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

import { getUserById, get } from '../../service/apiClient';
import UserIcon from '../../components/profile-icon';
import SimpleProfileCircle from '../../components/simpleProfileCircle';
import { useLoading } from '../../context/loading';
import { usePosts } from '../../context/posts';

const Dashboard = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [course, setCourse] = useState([]);
  const [cohorts, setCohorts] = useState(null) 
  
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
  const { openModal, setModal } = useModal();
  const { showGlobalLoading, hideGlobalLoading } = useLoading();
  const { loading: postsLoading, posts } = usePosts();

  // Create a function to run on user interaction
  const showModal = () => {
    setModal('Create a post', <CreatePostModal />); 
    openModal();
  };

  const [refresh, setRefresh] = useState(false);

  // Handle global loading based on posts loading state
  useEffect(() => {
    if (postsLoading && posts.length === 0) {
      showGlobalLoading('Loading posts...');
    } else {
      hideGlobalLoading();
    }
  }, [postsLoading, posts.length, showGlobalLoading, hideGlobalLoading]);

  // Combined useEffect for initial data fetching that only runs once on mount
  useEffect(() => {
    async function fetchInitialData() {
      try {
        // Fetch cohorts
        const cohortsResponse = await get("cohorts");
        setCohorts(cohortsResponse.data.cohorts);

        // Fetch cohort data for current user
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
/*         if (user.profile.cohort === null) {
          return;
        } */
        if (user.profile.cohort !== null) {
          const cohortData = await get(`cohorts/${user.profile.cohort.id}`);
          setCohort(cohortData.data.cohort)
          setCourse(cohortData.data.cohort.course);
          setStudents(cohortData.data.cohort.profiles)
        }

      } catch (error) {
        console.error('Error fetching initial data in dashboard/index.js:', error);
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchAndSetUserRole() {
      const storedToken = token || localStorage.getItem('token');
      if (!storedToken) return;
      
      try {
        const decoded = jwtDecode(storedToken);
        const user = await getUserById(decoded.userId);
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

  function getInitials(profile) {
        if (!profile.firstName || !profile.lastName) return "NA";
        const firstNameParts = profile.firstName.trim().split(/\s+/) || ''; 
        const lastNameInitial = profile.lastName.trim().charAt(0);
        
        const firstNameInitials = firstNameParts.map(name => name.charAt(0));
        
        return (firstNameInitials.join('') + lastNameInitial).toUpperCase();
    }

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            {/* <div className="profile-icon"> */}
            <SimpleProfileCircle
            photo={localStorage.getItem("userPhoto")}
            initials={initials} />

{/*                 <UserIcon
                    menu={false}
                    id={decodedToken.userId}
                    initials={initials}
                    firstname={decodedToken.firstName}
                    lastname={decodedToken.lastName}
                    role={decodedToken.role || 'User'}
                  /> */}
              {/* <p>{initials}</p> */}
            {/* </div> */}

            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts refresh={refresh}/>
      </main>

      <aside>
        <Card>
        <Search />
        </Card>
        { userRole === null || userRole === undefined ? (
          <div>Loading...</div>
        ) : (

          userRole === 2 ? (
            <Card>
              <h3>My Cohort</h3>
              {cohort.length !== 0 ? ( 
                <div>
                <p className='padding-top'>{course.name}, Cohort {cohort.id}</p>
              <section className='cohort-teachers-container border-top'>
                <ul className="students-list-teacher-view">
                  {students.map((student, index) => (
                    <li key={index} className="student-item">
                      <div>
                        <UserIcon
                          photo={student.photo}

                          key={student.id}
                          id={student.id}
                          initials={getInitials(student)}
                          firstname={student.firstName}
                          lastname={student.lastName}
                          role={"Student"}
                        />
                      </div>
                    </li>
                  ))}
                </ul> 
              </section> 
              </div> ):(
                
                <div className="">
                  <p className='padding-top'></p>
                <h3 className="loading-cohorts">Loading...</h3>
                <div className="loadingscreen-loader">
                <span></span>
                </div>
                </div>
               
               
              )}
            </Card>
          ) : (
            <>
              <Cohorts cohorts={cohorts}/>
              <Students refresh={refresh} setRefresh={setRefresh} cohorts={cohorts} />
              <TeachersDashboard/>
            </>

          )
        )}
         
      </aside>
    </>
  );
};

export default Dashboard;
