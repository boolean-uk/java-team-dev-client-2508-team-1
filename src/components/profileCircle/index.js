import { useState } from 'react';
import AddIcon from '../../assets/icons/addIcon';
import CohortIcon from '../../assets/icons/cohortIcon';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';
import DeleteIcon from '../../assets/icons/deleteIcon';
import MonitorIcon from '../../assets/icons/monitorIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';
import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import './style.css';

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


export const CascadingMenu = ({ id, setIsMenuVisible, setRefresh}) => {

  const [clicked, setClicked] = useState(false);

  return (
    <Menu className="profile-circle-menu">
      <MenuItem icon={<ProfileIcon />} text="Profile" linkTo={`/profile/${id}`} />
      <MenuItem icon={<AddIcon />} text="Add note" />

      <MenuItem icon={<CohortIcon />} text="Move to cohort">
        <MenuItem icon={<SquareBracketsIcon />} text="Software Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>

        <MenuItem icon={<MonitorIcon />} text="Frontend Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>
      </MenuItem>
      {clicked ? 
      <MenuItem icon={<DeleteIcon />} text="Confirm deletion" profileId = {id} clickable="DeleteUser" style={{color: 'red'}} setIsMenuVisible={setIsMenuVisible} setRefresh={setRefresh}/>
      :
      <MenuItem icon={<DeleteIcon />} text="Delete student" clickable="Clicked" clicked={clicked} setClicked={setClicked} setIsMenuVisible={setIsMenuVisible} setRefresh={setRefresh}/>
      }
    </Menu>
  );
};

export default ProfileCircle;
