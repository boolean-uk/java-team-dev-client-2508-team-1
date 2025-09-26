

import { useEffect } from 'react';



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
import Search from './search';

import UserIcon from '../../components/profile-icon';
import SimpleProfileCircle from '../../components/simpleProfileCircle';
import { useLoading } from '../../context/loading';
import { usePosts } from '../../context/posts';
import { useData } from '../../context/data';

const Dashboard = () => {
 
  const {cohorts,students, teachers, myCohort, studentsInMyCohort, myProfile, refresh} = useData()
  
  

  const  { userRole} = useUserRoleData();
  const { openModal, setModal } = useModal();
  const { showGlobalLoading, hideGlobalLoading } = useLoading();
  const { loading: postsLoading, posts } = usePosts();

  // Create a function to run on user interaction
  const showModal = () => {
    setModal('Create a post', <CreatePostModal />); 
    openModal();
  };


  // Handle global loading based on posts loading state
  useEffect(() => {
    if (postsLoading && posts.length === 0) {
      showGlobalLoading('Loading posts...');
    } else {
      hideGlobalLoading();
    }
  }, [postsLoading, posts.length, showGlobalLoading, hideGlobalLoading]);

  

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            {/* <div className="profile-icon"> */}
            <SimpleProfileCircle
            photo={localStorage.getItem("userPhoto")}
              initials={
  myProfile && myProfile.firstName && myProfile.lastName
      ? myProfile.firstName.charAt(0) + myProfile.lastName.charAt(0)
      : ""
             } />

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
              {myCohort.length !== 0 ? ( 
                <div>
                <p className='padding-top'>{myCohort.course.name}, Cohort {myCohort.id}</p>
              <section className='cohort-teachers-container border-top'>
                <ul className="students-list-teacher-view">
                  {studentsInMyCohort.map((student, index) => (
                    <li key={index} className="student-item">
                      <div>
                        <UserIcon
                          photo={student.photo}

                          key={student.id}
                          id={student.id}
                          initials={student.firstName.charAt(0) + student.lastName.charAt(0)}
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
              <Students students={students} />
              <TeachersDashboard teachers = {teachers}/>
            </>

          )
        )}
         
      </aside>
    </>
  );
};

export default Dashboard;
