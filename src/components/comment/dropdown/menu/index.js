import { useState } from 'react';
import EditIcon from '../../../../assets/icons/EditIcon';
import DeleteIcon from '../../../../assets/icons/deleteIcon';
import Menu from '../../../menu';
import MenuItem from '../../../menu/menuItem';
import './style.css';
import ReportIcon from '../../../../assets/icons/reporticon';
import SimpleProfileCircle from '../../../simpleProfileCircle';

const ProfileCircleComment = ({ initials, menuVisible, commentText, postId, commentId, name }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);

  return (
    <div className="profile-circle" onClick={() => setIsMenuVisible(!isMenuVisible)}>
      {isMenuVisible && (
        <CascadingMenuComment  
          commentText={commentText} 
          postId={postId} 
          commentId={commentId} 
          name={name} 
          isMenuVisible={isMenuVisible} 
          setIsMenuVisible={setIsMenuVisible} 
        />
      )}

      <div className="profile-icon">
          <SimpleProfileCircle
          initials={initials} />
        {/* <p>{initials}</p> */}
      </div>
    </div>
  );
};

export const CascadingMenuComment = ({edit, del, report, commentText, postId, commentId, name, isMenuVisible, setIsMenuVisible, onCommentDeleted }) => {
  return (
    <Menu className="profile-circle-menu">
      {edit && 
      <MenuItem 
        
        icon={<EditIcon />} 
        linkTo="" 
        text="Edit comment" 
        clickable={"CommentModal"} 
        commentText={commentText} 
        postId={postId} 
        commentId={commentId} 
        name={name} 
        isMenuVisible={isMenuVisible} 
        setIsMenuVisible={setIsMenuVisible}  
      />
      }
      {del &&
      <MenuItem 
        icon={<DeleteIcon />} 
        text="Delete comment" 
        clickable={"DeleteComment"} 
        postId={postId} 
        commentId={commentId} 
        name={name} 
        isMenuVisible={isMenuVisible} 
        setIsMenuVisible={setIsMenuVisible}
        onCommentDeleted={onCommentDeleted}
      />
} 
      {report &&
      <MenuItem 
        icon={<ReportIcon />} 
        text="Report comment" 
        clickable={"ReportComment"} 
        postId={postId} 
        commentId={commentId} 
        name={name} 
        isMenuVisible={isMenuVisible} 
        setIsMenuVisible={setIsMenuVisible}
        onCommentDeleted={onCommentDeleted}
      />
} 

    </Menu>
  );
};

export default ProfileCircleComment;