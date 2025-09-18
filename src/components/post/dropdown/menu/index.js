import { useState } from 'react';
import EditIcon from '../../../../assets/icons/EditIcon';
import DeleteIcon from '../../../../assets/icons/deleteIcon';
import Menu from '../../../menu';
import MenuItem from '../../../menu/menuItem';
import './style.css';

const ProfileCirclePost = ({ initials, menuVisible, postText, postId, name }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);


  
  return (
    <div className="profile-circle" onClick={() => setIsMenuVisible(!isMenuVisible)}>
      {isMenuVisible && <CascadingMenuPost  postText={postText} postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />}

      <div className="profile-icon">
        <p>{initials}</p>
      </div>
    </div>
  );
};

export const CascadingMenuPost = ({ postText, postId, name, isMenuVisible, setIsMenuVisible }) => {
  return (
    <Menu className="profile-circle-menu">
{/*           <li onClick={showModal}>

        <EditIcon/>
        <p>Edit post</p>
    </li> */}
       <MenuItem icon={<EditIcon />} linkTo="" text="Edit post" clickable={"Modal"} postText={postText} postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}  />
      <MenuItem icon={<DeleteIcon />} text="Delete post" clickable={"Delete"} postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}/>
    </Menu>
  );
};

export default ProfileCirclePost;
