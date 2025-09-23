import { useState } from 'react';
import EditIcon from '../../../../assets/icons/EditIcon';
import DeleteIcon from '../../../../assets/icons/deleteIcon';
import Menu from '../../../menu';
import MenuItem from '../../../menu/menuItem';
import './style.css';
import ReportIcon from '../../../../assets/icons/reporticon';

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

export const CascadingMenuPost = ({ editPost, deletePost, reportPost, postText, postId, name, isMenuVisible, setIsMenuVisible }) => {
  return (
    <Menu className="profile-circle-menu">
{/*           <li onClick={showModal}>

        <EditIcon/>
        <p>Edit post</p>
    </li> */}
       {editPost ? <MenuItem icon={<EditIcon />}  linkTo="" text="Edit post" clickable={"Modal"} postText={postText} postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}  />  : null}
       {deletePost ? <MenuItem icon={<DeleteIcon />}  text="Delete post" clickable={"Delete"} postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}/> : null}
        {reportPost ? <MenuItem icon={<ReportIcon />}  text="Report post" clickable={"Report"} postId={postId} name={name} isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}/> : null}
    </Menu>
  );
};

export default ProfileCirclePost;
