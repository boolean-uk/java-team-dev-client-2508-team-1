import { useState, useRef, useEffect } from 'react';
import { CascadingMenuComment } from './menu/index';
import { useComments } from '../../../context/comments';

const MenuComment = ({ edit=false, del=false, report=false, menuVisible, commentText, postId, commentId, name, onCommentDeleted, onDeleteComment }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(menuVisible || false);
  const menuRef = useRef(null);
  const { deleteComment } = useComments();

  const handleCommentDeleted = async () => {
    if (onDeleteComment) {
      await onDeleteComment();
    } else {
      const success = await deleteComment(postId, commentId);
      if (success && onCommentDeleted) {
        onCommentDeleted(commentId);
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="edit-icon-wrapper">
      <div className="icon-button" onClick={() => {
        setIsMenuVisible(!isMenuVisible);
      }}>
        <span className="dots">
          <span className="dot">•</span>
          <span className="dot">•</span>
          <span className="dot">•</span>
        </span>
      </div>
      <div className='menu-left'> 
        {isMenuVisible && (
          <CascadingMenuComment 
            edit={edit}
            del={del}
            report={report}
            commentText={commentText} 
            postId={postId} 
            commentId={commentId} 
            name={name} 
            isMenuVisible={isMenuVisible} 
            setIsMenuVisible={setIsMenuVisible} 
            onCommentDeleted={handleCommentDeleted} 
          />
        )}
      </div>
    </div>
  );
};

export default MenuComment;