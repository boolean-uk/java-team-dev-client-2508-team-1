import { useState } from 'react';
import AddIcon from '../../assets/icons/addIcon';
import CohortIcon from '../../assets/icons/cohortIcon';
import DeleteIcon from '../../assets/icons/deleteIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import './style.css';
import SoftwareLogo from '../../assets/icons/software-logo';
import FrontEndLogo from '../../assets/icons/frontEndLogo';
import DataAnalyticsLogo from '../../assets/icons/dataAnalyticsLogo';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';

/*
ADDED A PROP CLICKABLE
use the className='profile-circle-noclick' if you need the ProfileCircle but
do not need the menu options (this is used in the posts in dashboard for both 
teachers and students)
*/
const ProfileCircle = ({ id, initials, menuVisible, clickable }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);

  return (

    <>
    {clickable ? (
      <div className="profile-circle" onClick={() => setIsMenuVisible(!isMenuVisible)}>
      {isMenuVisible && <CascadingMenu id = {id} />}


      <div className="profile-icon">
        <p>{initials}</p>
      </div>
    </div>
    ) : (
      <div className="profile-circle-noclick">
        <div className="profile-icon">
          <p>{initials}</p>
        </div>
      </div>
    )}
    </>
    
  );
};


export const CascadingMenu = ({ id, setIsMenuVisible, setRefresh, setSnackBarMessage, cohorts }) => {

  const [clicked, setClicked] = useState(false);
  console.log("CASCADING ID", id)
  console.log("CASCADING cohort", cohorts)

  return (
    <Menu className="profile-circle-menu">
      <MenuItem icon={<ProfileIcon />} text="Profile" linkTo={`/profile/${id}`} />
      <MenuItem icon={<AddIcon />} text="Add note" />

      <MenuItem icon={<CohortIcon />} text="Move to cohort" userId = {id}>
        {Array.from(new Map(
          cohorts.map(cohort => [cohort.course.name, cohort.course])).values())
            .map((course, index) => (
          <MenuItem 
            key={course.id || index}
            icon={
              course.name === "Software Development" ? <SoftwareLogo /> :
              course.name === "Front-End Development" ? <FrontEndLogo /> :
              course.name === "Data Analytics" ? <DataAnalyticsLogo /> : ""
            }
            text = {course.name}
          >
            {cohorts
          .filter(c => c.course.name === course.name)
          .map(cohort => (
            <MenuItem
              key={cohort.id}
              icon={<CohortIconFill />}
              text={cohort.name}
              clickable="MoveStudent"
              profileId={id}
              cohortId={cohort.id}
              setIsMenuVisible={setIsMenuVisible}
              setSnackBarMessage={setSnackBarMessage}
              setRefresh={setRefresh}
            />
          ))}
          </MenuItem>
        ))}
      </MenuItem>
      {clicked ? 
      <MenuItem 
        icon={<DeleteIcon />} 
        text="Confirm deletion" 
        profileId = {id} 
        clickable="DeleteUser" 
        style={{color: 'red'}} 
        setIsMenuVisible={setIsMenuVisible} 
        setRefresh={setRefresh} 
        setSnackBarMessage={setSnackBarMessage}
      />
      :
      <MenuItem icon={<DeleteIcon />} 
        text="Delete student" 
        clickable="Clicked" 
        clicked={clicked} 
        setClicked={setClicked} 
        setIsMenuVisible={setIsMenuVisible} 
        setRefresh={setRefresh} 
        setSnackBarMessage={setSnackBarMessage}
      />
      }
    </Menu>
  );
};

export default ProfileCircle;
